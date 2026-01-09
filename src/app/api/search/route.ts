import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    if (!query?.trim()) {
      return NextResponse.json({
        data: {
          hits: [],
          page: 1,
          totalPages: 0,
          totalResults: 0,
          limit: parseInt(limit),
          hasNextPage: false,
          hasPrevPage: false,
          nextPage: null,
          prevPage: null,
          query: "",
        },
        error: null,
      });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/global-search?q=${encodeURIComponent(
        query,
      )}&page=${page}&limit=${limit}`,
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
      data: result || {
        hits: [],
        page: parseInt(page),
        totalPages: 0,
        totalResults: 0,
        limit: parseInt(limit),
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
        query: query,
      },
      error: null,
    });
  } catch (error) {
    console.error("Search API error:", error);
    const limit = request.nextUrl.searchParams.get("limit") || "10";
    return NextResponse.json(
      {
        data: {
          hits: [],
          page: 1,
          totalPages: 0,
          totalResults: 0,
          limit: parseInt(limit),
          hasNextPage: false,
          hasPrevPage: false,
          nextPage: null,
          prevPage: null,
          query: "",
        },
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch search results",
      },
      { status: 500 },
    );
  }
}
