export async function getPageData(slug: string) {
  try {
    // Validate slug
    if (!slug) {
      throw new Error("Slug is required");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${slug}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    // Handle non-OK response
    if (!response.ok) {
      throw new Error("Failed to fetch with response not ok");
    }

    const data = await response.json();
    
    return {
      data: data?.layout?.[0],
      seo: data?.seo,
    };
  } catch (error: unknown) {
    // Handle fetch error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch page data: ${error?.message}`);
    }
  }
}
