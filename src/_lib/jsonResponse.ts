import { gzipSync } from "node:zlib";

/**
 * Next compresses rendered pages but not Route Handler responses, so these
 * JSON proxies were going out uncompressed -- 276KB of it on the homepage
 * alone. Gzip here instead, honouring Accept-Encoding so a client that did not
 * ask for it still gets plain JSON.
 */
export function jsonResponse(
  req: Request,
  data: unknown,
  init?: { status?: number },
) {
  const body = JSON.stringify(data);
  const status = init?.status ?? 200;

  if (!req.headers.get("accept-encoding")?.includes("gzip")) {
    return new Response(body, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(gzipSync(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
      Vary: "Accept-Encoding",
    },
  });
}
