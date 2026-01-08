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

    // If 404, return null instead of throwing
    if (response.status === 404) {
      return null;
    }
    

    // Handle non-OK response
    if (!response.ok) {
      throw new Error("Failed to fetch with response not ok");
    }

    const data = await response.json();
    console.log("data", data?.layout?.[0])
    return {
      data: data?.layout?.[0],
      seo: data?.seo,
      pressData:data,
    };
  } catch (error: unknown) {
    // Handle fetch error
    if (error instanceof Error) {
      throw new Error(`Failed to fetch page data: ${error?.message}`);
    }
  }
}
