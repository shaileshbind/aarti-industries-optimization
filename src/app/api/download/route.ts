import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const requestLanguage = request.headers.get("accept-language");
    const requestUserAgent = request.headers.get("user-agent");

    const upstreamHeaders = new Headers();
    // Some CDNs respond 406 to Safari's accept header; prefer generic accept.
    upstreamHeaders.set("accept", "*/*");
    if (requestLanguage) upstreamHeaders.set("accept-language", requestLanguage);
    if (requestUserAgent) upstreamHeaders.set("user-agent", requestUserAgent);

    let response = await fetch(url, { headers: upstreamHeaders });

    if (response.status === 406) {
      const fallbackHeaders = new Headers({
        accept: "application/pdf,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        "user-agent":
          requestUserAgent ||
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      });

      response = await fetch(url, { headers: fallbackHeaders });
    }

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const blob = await response.blob();
    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    // Extract extension from URL or content type
    let extension = "file";
    if (filename) {
      extension = filename.split(".").pop() || "file";
    } else {
      const urlPath = new URL(url).pathname;
      const urlExtension = urlPath.split(".").pop();
      if (urlExtension && urlExtension.length <= 5) {
        extension = urlExtension;
      } else {
        // Fallback: get extension from content type
        const mimeToExt: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/jpg": "jpg",
          "image/png": "png",
          "image/gif": "gif",
          "image/webp": "webp",
          "image/svg+xml": "svg",
          "application/pdf": "pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            "docx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            "xlsx",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            "pptx",
          "application/msword": "doc",
          "application/zip": "zip",
          "text/plain": "txt",
          "text/csv": "csv",
        };
        extension = mimeToExt[contentType] || "file";
      }
    }

    const finalFilename =
      filename?.replace(/[^a-zA-Z0-9 ]/g, "") || `download.${extension}`;

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${finalFilename}"`,
        "Content-Length": blob.size.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 },
    );
  }
}
