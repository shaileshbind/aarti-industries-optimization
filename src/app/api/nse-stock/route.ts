import { NextResponse } from "next/server";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
  const token = process.env.API_TOKEN;

  if (!base || !token) {
    console.error("Missing environment variables:", {
      hasBase: !!base,
      hasToken: !!token,
      baseValue: base ? "***" : undefined,
    });
    return NextResponse.json(
      { 
        error: "Missing server environment variables",
        success: false,
        details: "NEXT_PUBLIC_BASE_URL or BASE_URL and API_TOKEN must be configured"
      },
      { status: 500 },
    );
  }

  try {
    const url = `${base}/nse-stock/find`;
    console.log(`[NSE Stock API] Fetching from: ${url.replace(/\/\/.*@/, "//***@")}`);
    
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[NSE Stock API] External API error: ${res.status}`, errorText);

      return NextResponse.json(
        { 
          error: "Failed to fetch NSE stock data", 
          details: errorText,
          success: false,
          status: res.status
        },
        { status: res.status >= 500 ? 500 : res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[NSE Stock API] Fetch error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const isTimeout = errorMessage.includes("timeout") || errorMessage.includes("aborted");

    return NextResponse.json(
      { 
        error: "Server error while fetching NSE stock data",
        success: false,
        details: isTimeout ? "Request timeout" : errorMessage
      },
      { status: 500 },
    );
  }
}
