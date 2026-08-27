export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const token = process.env.API_TOKEN;

  if (!base || !token) {
    return new Response(
      JSON.stringify({ error: "Missing server environment variables" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const upstreamUrl = `${base}/events/feed`;
    const res = await fetch(upstreamUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(
        JSON.stringify({
          error: "Failed to fetch events feed",
          details: errorText,
        }),
        { status: res.status, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (_error) {
    return new Response(
      JSON.stringify({ error: "Server error while fetching events feed" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
