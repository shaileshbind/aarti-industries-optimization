import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRedirects, type RedirectMapping } from "./_lib/getRedirects";

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

function getRedirectStatus(mapping: RedirectMapping): 301 | 302 | 303 | 307 | 308 {
  const s = mapping.redirectionType;
  return s === 301 || s === 302 || s === 303 || s === 307 || s === 308 ? s : 301;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // Skip redirect check for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
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

  return NextResponse.next();
}

// Configure which routes the middleware should run on
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)).*)",
  ],
};
