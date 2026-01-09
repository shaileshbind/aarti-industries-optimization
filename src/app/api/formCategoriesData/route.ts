import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/form-categories?populate=*`,
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
        `Failed to fetch form categories: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        data: data?.data || [],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
      },
      { status: 500 },
    );
  }
}
