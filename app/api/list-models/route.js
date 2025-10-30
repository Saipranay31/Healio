import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in .env file");
    }

    // ✅ The correct way: use ?key=YOUR_API_KEY instead of Authorization header
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch models: ${response.status} ${response.statusText}\n${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await response.json();
    console.log("✅ Available models:", data.models);

    return NextResponse.json({
      message: "Successfully fetched Gemini models",
      models: data.models,
    });
  } catch (error) {
    console.error("❌ Error fetching models:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
