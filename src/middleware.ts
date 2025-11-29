import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRedirects, type RedirectMapping } from "./_lib/getRedirects";

// Cache redirects in memory to avoid fetching on every request
let redirectCache: RedirectMapping[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

async function getCachedRedirects(): Promise<RedirectMapping[]> {
  const now = Date.now()
  // Return cached redirects if still valid
  if (redirectCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return redirectCache;
  }
  // Fetch fresh redirects
  redirectCache = await getRedirects();
  cacheTimestamp = now;
  return redirectCache;
}

export async function middleware(request: NextRequest) {
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
    // Get redirect mappings from backend
    const redirects = await getCachedRedirects();

    // Normalize the current pathname (remove trailing slash for comparison)
    const normalizedPath =
      pathname.endsWith("/") && pathname !== "/"
        ? pathname.slice(0, -1)
        : pathname;

    // Check if current URL matches any old URL
    for (const redirect of redirects) {
      // Normalize old URL (remove trailing slash)
      const normalizedOldUrl =
        redirect.oldUrl.endsWith("/") && redirect.oldUrl !== "/"
          ? redirect.oldUrl.slice(0, -1)
          : redirect.oldUrl;

      // Check for exact match or match with trailing slash
      if (
        normalizedPath === normalizedOldUrl ||
        pathname === redirect.oldUrl ||
        normalizedPath === redirect.oldUrl
      ) {
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

        // Preserve query parameters from the original request
        if (search) {
          newUrl.search = search;
        }

        // Perform 301 permanent redirect
        return NextResponse.redirect(newUrl, 301);
      }
    }
  } catch (error) {
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
