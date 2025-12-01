export async function getDemoData(slug: string) {
  try {
    // Validate slug
    if (!slug) {
      throw new Error("Slug is required");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OTHER_URL}${slug}`,
      {
        cache: "no-store",
      }
    );

    // Handle non-OK response
    if (!response.ok) {
      throw new Error("Failed to fetch with response not ok");
    }

    const data = await response.json();
    console.log("%cFetched Data", "color : yellow", data?.layout?.[0]);

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
