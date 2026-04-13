import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");

    if (!query?.trim()) {
      return NextResponse.json({ data: [], error: null });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/search/autocomplete?q=${encodeURIComponent(query)}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({ data: result, error: null });
  } catch (error) {
    console.error("Autocomplete API error:", error);
    return NextResponse.json(
      {
        data: [],
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch autocomplete results",
      },
      { status: 500 },
    );
  }
}
