import { NextRequest, NextResponse } from "next/server";

type ProductSearchResponse = {
  query: string | null;
  total: number;
  data: Array<{
    productName: string;
  }>;
};

export async function GET(request: NextRequest) {
  console.log("🚀 API Route Hit: /api/product-form-search");
  console.log("📝 Method: GET");

  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const searchQuery = q.trim();

    console.log("🔎 Search Query:", searchQuery || "(empty)");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.error("❌ NEXT_PUBLIC_BASE_URL not configured");
      return NextResponse.json(
        {
          message: "Server configuration error",
          error: "NEXT_PUBLIC_BASE_URL not set",
        },
        { status: 500 },
      );
    }

    console.log("🌐 Base URL:", baseUrl);

    // Construct URL - baseUrl already includes /api
    const url = `${baseUrl}/product-search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`;

    console.log("📡 Fetching from:", url);

    const apiToken = process.env.API_TOKEN;

    if (!apiToken) {
      console.error("❌ API_TOKEN not configured");
      return NextResponse.json(
        {
          message: "Server configuration error",
          error: "API_TOKEN not set",
        },
        { status: 500 },
      );
    }

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    console.log("📊 Response status:", response.status);

    if (!response.ok) {
      console.error(
        `❌ Backend API returned ${response.status}: ${response.statusText}`,
      );

      // Return empty results for 404 instead of failing
      if (response.status === 404) {
        console.log("⚠️ 404 - Returning empty results");
        return NextResponse.json({
          query: searchQuery || null,
          total: 0,
          data: [],
        });
      }

      const errorText = await response.text();
      console.error("Error response:", errorText);

      return NextResponse.json(
        {
          message: `Backend API error: ${response.statusText}`,
          error: errorText,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("✅ Data received:", {
      total: data?.total || 0,
      dataLength: data?.data?.length || 0,
      query: searchQuery,
    });

    // Ensure data structure is correct
    const formattedData: ProductSearchResponse = {
      query: searchQuery || null,
      total: data?.total || 0,
      data: Array.isArray(data?.data) ? data.data : [],
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("❌ Product form search error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);

    // Return empty results on error instead of failing
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";

    return NextResponse.json({
      query: q,
      total: 0,
      data: [],
    });
  }
}
