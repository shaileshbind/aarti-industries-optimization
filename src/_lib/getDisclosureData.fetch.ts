export const getDisclosureData = async (slug: string) => {
  try {
    // Validate slug
    if (!slug) {
      throw new Error("Slug is required");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${slug}`, {
      next: { revalidate: 600 }, // increasing revalidate 300 to 600 (10mins)
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

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
