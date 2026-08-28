import { NextResponse } from "next/server";
import { jsonResponse } from "@/_lib/jsonResponse";

export async function GET(req: Request) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const token = process.env.API_TOKEN;

  if (!base || !token) {
    return NextResponse.json(
      { error: "Missing server environment variables" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${base}/press-releases`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      return NextResponse.json(
        { error: "Failed to fetch press releases", details: errorText },
        { status: res.status },
      );
    }

    const data = await res.json();
    return jsonResponse(req, data);
  } catch (error) {
    console.error("Press releases fetch error:", error);

    return NextResponse.json(
      { error: "Server error while fetching press releases" },
      { status: 500 },
    );
  }
}
