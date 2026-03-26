import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "JSON format API is working. Send a POST request to format JSON.",
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
    const formattedJson = JSON.stringify(parsedJson, null, 2);

    return NextResponse.json(
      {
        success: true,
        formattedJson,
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
