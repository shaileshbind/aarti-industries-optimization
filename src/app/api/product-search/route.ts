import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query === "") {
      return NextResponse.json(
        { error: "Missing required parameter: q" },
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

    const apiUrl = new URL(`${baseUrl}/product/search`);
    apiUrl.searchParams.append("q", query);

    //console.log("Search API URL:", apiUrl.toString());

    const res = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      return NextResponse.json(
        { error: "Failed to fetch search results from backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
