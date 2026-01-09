import { NextRequest, NextResponse } from "next/server";

// Type mapping for API filter
const getTypeFromSlug = (slug: string): string => {
  const typeMap: { [key: string]: string } = {
    blogs: "blog",
    "case-study": "case-study",
  };
  return typeMap[slug] || slug;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "blogs";
    const page = searchParams.get("page") || "1";
    const excludeId = searchParams.get("excludeId");

    const typeFilter = getTypeFromSlug(type);

    // Build the API URL
    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog-case-studies`,
    );

    // Add query parameters
    apiUrl.searchParams.append("sort[0]", "date:desc");
    apiUrl.searchParams.append("filters[type][$eq]", typeFilter);

    // Populate thumbnail images
    apiUrl.searchParams.append(
      "populate[thumbnailImageDesktop][fields][0]",
      "url",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageDesktop][fields][1]",
      "alternativeText",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageDesktop][fields][2]",
      "mime",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageDesktop][fields][3]",
      "ext",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageMobile][fields][0]",
      "url",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageMobile][fields][1]",
      "alternativeText",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageMobile][fields][2]",
      "mime",
    );
    apiUrl.searchParams.append(
      "populate[thumbnailImageMobile][fields][3]",
      "ext",
    );

    // Add fields
    apiUrl.searchParams.append("fields[0]", "title");
    apiUrl.searchParams.append("fields[1]", "date");
    apiUrl.searchParams.append("fields[2]", "type");
    apiUrl.searchParams.append("fields[3]", "excerpt");
    apiUrl.searchParams.append("fields[4]", "slug");

    // Pagination
    apiUrl.searchParams.append("pagination[pageSize]", "12");
    apiUrl.searchParams.append("pagination[page]", page);

    // Status
    apiUrl.searchParams.append("status", "published");

    // Exclude ID for blogs if provided
    if (typeFilter === "blog" && excludeId) {
      apiUrl.searchParams.append("filters[documentId][$ne]", excludeId);
    }

    // Fetch data from external API
    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 20 },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch blog data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
