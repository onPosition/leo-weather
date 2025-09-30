import { NextResponse } from "next/server";

const API_URL = process.env.GEOCODING_API_URL;
const API_KEY = process.env.GEOCODING_API_KEY;
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place = searchParams.get("place");

  const res = await fetch(
    `${API_URL}?text=${place}&limit=5&type=city&apiKey=${API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Failed to fetch autocomplete data: ${error.message}`);
  }
  const data = await res.json();
  return NextResponse.json(data);
}
