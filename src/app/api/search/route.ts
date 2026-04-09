import { NextRequest, NextResponse } from "next/server";

const EMPTY_RESPONSE = {
  query: "",
  suggestions: { pages: [], blogs: [], products: [] },
};

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");

    if (!query?.trim()) {
      return NextResponse.json({ data: EMPTY_RESPONSE, error: null });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/search/suggestions?q=${encodeURIComponent(query)}`,
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

    return NextResponse.json({
      data: result || EMPTY_RESPONSE,
      error: null,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        data: EMPTY_RESPONSE,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch search results",
      },
      { status: 500 },
    );
  }
}
