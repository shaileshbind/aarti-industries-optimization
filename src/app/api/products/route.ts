import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    if (!category) {
      return NextResponse.json(
        { error: "Missing required parameter: category" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Missing environment variable: NEXT_PUBLIC_BASE_URL" },
        { status: 500 }
      );
    }

    // Build full backend URL
    const apiUrl = new URL(`${baseUrl}/product/filter`);
    apiUrl.searchParams.append("category", category);
    if (subcategory) apiUrl.searchParams.append("subcategory", subcategory);

    // Forward the request
    const res = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: "no-store", // prevent caching
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      return NextResponse.json(
        { error: "Failed to fetch products from backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
