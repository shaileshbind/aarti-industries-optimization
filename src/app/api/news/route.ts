import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "";
    const page = searchParams.get("_page") || "1";
    const limit = searchParams.get("_limit") || "12";
    const base = process.env.NEXT_PUBLIC_BASE_URL;
    const token = process.env.API_TOKEN;
    const response = await fetch(
      `${base}/news?type=${type}&_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.status}` },
        { status: 500 },
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
