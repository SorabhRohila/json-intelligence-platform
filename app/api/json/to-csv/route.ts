import { NextResponse } from "next/server";

function escapeCsvValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  const needsQuotes =
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r");

  if (needsQuotes) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "JSON to CSV API is working. Send a POST request to convert JSON.",
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jsonText = body.json;

    if (typeof jsonText !== "string" || jsonText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "The 'json' field is required and must be a non-empty string.",
        },
        { status: 400 }
      );
    }

    const parsedJson = JSON.parse(jsonText);

    if (!Array.isArray(parsedJson)) {
      return NextResponse.json(
        {
          success: false,
          error: "Top-level JSON must be an array of objects for CSV conversion.",
        },
        { status: 400 }
      );
    }

    if (parsedJson.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "JSON array is empty. Add at least one object to convert.",
        },
        { status: 400 }
      );
    }

    const allObjects = parsedJson.every(
      (item) => item !== null && typeof item === "object" && !Array.isArray(item)
    );

    if (!allObjects) {
      return NextResponse.json(
        {
          success: false,
          error: "Every item in the array must be a plain object.",
        },
        { status: 400 }
      );
    }

    const headers = Array.from(
      new Set(parsedJson.flatMap((item) => Object.keys(item)))
    );

    const csvRows = [
      headers.join(","),
      ...parsedJson.map((item) =>
        headers.map((header) => escapeCsvValue(item[header])).join(",")
      ),
    ];

    const csv = csvRows.join("\n");

    return NextResponse.json(
      {
        success: true,
        csv,
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
