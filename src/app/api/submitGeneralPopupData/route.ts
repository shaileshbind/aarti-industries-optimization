import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("ssddffggwerdfv", body);

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/msds-form/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!data.ok) {
      const error = await data.json();
      return NextResponse.json(
        { error: "API submission failed", details: error },
        { status: data.status }
      );
    }

    const result = await data.json();
    return NextResponse.json({
      message: "API submission successful",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}
