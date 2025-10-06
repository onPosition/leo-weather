import { NextResponse } from "next/server";

const API_URL = process.env.AI_API_URL;
const API_KEY = process.env.AI_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weatherData, currentLocation } = body;
    if (!weatherData) {
      return NextResponse.json(
        { error: "Can't get weather data" },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    const role = "helpful weather assistant";
    const prompt = `
  You are ${role}. Give a short (1-2 sentences) piece of advice on what clothes to wear based on the weather in ${currentLocation.city}. Don't use markdown, just plain text. You can use emojis if you want.
  - Temperature: ${weatherData.temperature}°C
  - Precipitation Probability: ${weatherData.precipitationProbability}%
  - Rain Intensity: ${weatherData.rainIntensity} (0 - no rain)
  - Wind Speed: ${weatherData.windSpeed} m/s
  - UV Index: ${weatherData.uvIndex}
`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: "Cannot generate weather tip", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiTip = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ tip: aiTip?.trim() });
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
