import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip");
  const res = await fetch(`https://ipwho.is/${ip}`);
  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({
      city: "New York City",
      lat: 40.7128,
      lon: -74.006,
      timezone: { name: "America/New_York" },
    });
  }

  return NextResponse.json({
    city: data.city,
    lat: data.latitude,
    lon: data.longitude,
    timezone: { name: data.timezone.id },
  });
}
