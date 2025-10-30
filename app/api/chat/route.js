import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    

    // ✅ Initialize Gemini SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ Use cheaper & faster model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // ✅ Handle incoming request data
    const { messages, contextData } = await req.json();

    const geminiMessages = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // ✅ Add context prompt at start
    const contextPrompt = `You have access to the following data: ${JSON.stringify(
      contextData
    )}. Use this information to provide accurate answers.`;

    geminiMessages.unshift({ role: "user", parts: [{ text: contextPrompt }] });

    // ✅ Generate content
    const result = await model.generateContent({
      contents: geminiMessages,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    });

    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (error) {
    console.error("❌ Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
