import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getRedirects, type RedirectMapping } from "./_lib/getRedirects";

/** When false (or unset), redirect unauthenticated users to /login. Prod (true) = no gate. */
const REQUIRE_LOGIN = process.env.NEXT_PUBLIC_IS_PRODUCTION !== "true";

function stripTrailingSlash(path: string): string {
  if (path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function safePathnameFromUrl(value: string): string {
  // Supports both absolute URLs and relative paths stored in CMS.
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return new URL(value).pathname || "/";
    }
  } catch {
    // fall through
  }
  // Ensure it behaves like a pathname
  return value.startsWith("/") ? value : `/${value}`;
}

function getRedirectStatus(
  mapping: RedirectMapping,
): 301 | 302 | 303 | 307 | 308 {
  const s = mapping.redirectionType;
  return s === 301 || s === 302 || s === 303 || s === 307 || s === 308
    ? s
    : 301;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // Skip redirect check for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    //  pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
    pathname.match(
      /\.(ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot|js|css|json|txt|xml|mp4|webm|pdf)$/,
    )
  ) {
    return NextResponse.next();
  }
  try {
    // Get redirect mappings from backend (no in-memory cache; reflects changes immediately)
    const redirects = await getRedirects();

    // Normalize the current pathname (remove trailing slash for comparison)
    const normalizedPath = stripTrailingSlash(pathname);

    // Check if current URL matches any old URL
    for (const redirect of redirects) {
      // Old URL can be absolute (https://...) or relative (/path). We match by pathname.
      const oldPath = stripTrailingSlash(safePathnameFromUrl(redirect.oldUrl));

      // Check for exact match or match with trailing slash
      if (normalizedPath === oldPath) {
        // Build the new URL
        let newUrl: URL;

        // Check if newUrl is absolute (starts with http:// or https://)
        if (
          redirect.newUrl.startsWith("http://") ||
          redirect.newUrl.startsWith("https://")
        ) {
          newUrl = new URL(redirect.newUrl);
        } else {
          // Relative URL - construct using the request origin
          newUrl = new URL(redirect.newUrl, request.url);
        }

        // Preserve query parameters from the original request (without clobbering newUrl params)
        if (search) {
          const incoming = new URLSearchParams(search);
          for (const [k, v] of incoming.entries()) {
            if (!newUrl.searchParams.has(k)) newUrl.searchParams.append(k, v);
          }
        }

        return NextResponse.redirect(newUrl, getRedirectStatus(redirect));
      }
    }
  } catch {
    // Continue with normal request if redirect check fails
  }

  // Auth gate: redirect unauthenticated users to /login when not production
  if (REQUIRE_LOGIN) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const valid = !!token;
    const isLogin = pathname === "/login";

    if (valid && isLogin) {
      const next =
        request.nextUrl.searchParams.get("callbackUrl") ??
        request.nextUrl.searchParams.get("next") ??
        "/";
      const path = next.startsWith("/") && !next.startsWith("//") ? next : "/";
      const url = request.nextUrl.clone();
      url.pathname = path;
      url.search = "";
      return NextResponse.redirect(url);
    }
    if (valid) return NextResponse.next();
    if (!isLogin) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which routes the proxy runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot|js|css|json|txt|xml|mp4|webm|pdf)).*)",
  ],
};
