import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = [];
    let start = 0;
    const limit = 100;
    let total = null;

    do {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products?pagination[start]=${start}&pagination[limit]=${limit}`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (total === null) {
        total = data?.meta?.pagination?.total || 0;
      }
      const products = data?.data || [];
      allProducts.push(...products);
      start += limit;
    } while (allProducts.length < total);

    return NextResponse.json(
      {
        success: true,
        data: allProducts,
        meta: {
          pagination: {
            total: total,
            fetched: allProducts.length,
          },
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
