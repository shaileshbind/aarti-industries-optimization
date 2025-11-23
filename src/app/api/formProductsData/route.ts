import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
      {
        cache: "no-store", // ensures fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch form categories: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        data: data?.data || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
      },
      { status: 500 }
    );
  }
}
