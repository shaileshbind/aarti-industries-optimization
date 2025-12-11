import { NextResponse } from "next/server";

export function GET() {
  const isProd = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

  const content = isProd
    ? `
        User-agent: *
        Allow: /
        Sitemap: https://aarti-industries.com/sitemap.xml
    `
    : `
        User-agent: *
        Disallow: /
    `;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
