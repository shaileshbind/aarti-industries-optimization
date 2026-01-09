import { NextResponse } from "next/server";

export async function GET() {
  const base = "https://admin.aarti-industries.com/api/nse-stock/find";
  const token = process.env.API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing server environment variables" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${base}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      return NextResponse.json(
        { error: "Failed to fetch NSE stock data", details: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("NSE stock fetch error:", error);

    return NextResponse.json(
      { error: "Server error while fetching NSE stock data" },
      { status: 500 },
    );
  }
}
