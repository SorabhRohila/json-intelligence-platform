import { NextResponse } from "next/server";

type DiffItem = {
  path: string;
  type: "added" | "removed" | "changed" | "type-mismatch";
  leftValue?: unknown;
  rightValue?: unknown;
};

function isPlainObject(value: unknown) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function compareJson(
  left: unknown,
  right: unknown,
  currentPath = "root"
): DiffItem[] {
  const diffs: DiffItem[] = [];

  if (typeof left !== typeof right) {
    diffs.push({
      path: currentPath,
      type: "type-mismatch",
      leftValue: left,
      rightValue: right,
    });
    return diffs;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLength = Math.max(left.length, right.length);

    for (let index = 0; index < maxLength; index++) {
      const nextPath = `${currentPath}[${index}]`;

      if (index >= left.length) {
        diffs.push({
          path: nextPath,
          type: "added",
          rightValue: right[index],
        });
        continue;
      }

      if (index >= right.length) {
        diffs.push({
          path: nextPath,
          type: "removed",
          leftValue: left[index],
        });
        continue;
      }

      diffs.push(...compareJson(left[index], right[index], nextPath));
    }

    return diffs;
  }

  if (isPlainObject(left) && isPlainObject(right)) {
    const allKeys = Array.from(
      new Set([...Object.keys(left as Record<string, any>), ...Object.keys(right as Record<string, any>)])
    );

    for (const key of allKeys) {
      const nextPath = `${currentPath}.${key}`;

      if (!(key in (left as Record<string, any>))) {
        diffs.push({
          path: nextPath,
          type: "added",
          rightValue: (right as Record<string, any>)[key],
        });
        continue;
      }

      if (!(key in (right as Record<string, any>))) {
        diffs.push({
          path: nextPath,
          type: "removed",
          leftValue: (left as Record<string, any>)[key],
        });
        continue;
      }

      diffs.push(
  ...compareJson(
    (left as Record<string, any>)[key],
    (right as Record<string, any>)[key],
    nextPath
  )
);
    }

    return diffs;
  }

  if (left !== right) {
    diffs.push({
      path: currentPath,
      type: "changed",
      leftValue: left,
      rightValue: right,
    });
  }

  return diffs;
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "JSON diff API is working. Send a POST request with leftJson and rightJson.",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const leftJsonText = body.leftJson;
    const rightJsonText = body.rightJson;

    if (
      typeof leftJsonText !== "string" ||
      leftJsonText.trim().length === 0 ||
      typeof rightJsonText !== "string" ||
      rightJsonText.trim().length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Both 'leftJson' and 'rightJson' are required and must be non-empty strings.",
        },
        { status: 400 }
      );
    }

    const leftParsed = JSON.parse(leftJsonText);
    const rightParsed = JSON.parse(rightJsonText);

    const diffs = compareJson(leftParsed, rightParsed);

    return NextResponse.json(
      {
        success: true,
        isEqual: diffs.length === 0,
        diffCount: diffs.length,
        diffs,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Unknown server error",
      },
      { status: 500 }
    );
  }
}
