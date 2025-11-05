export const getData = async (slug: string) => {
  try {
    // Validate slug
    if (!slug) {
      throw new Error("Slug is required");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${slug}`, {
      cache: "no-store",
    });

    // Handle non-OK response
    if (!response.ok) {
      throw new Error("Failed to fetch with response not ok");
    }

    const data = await response.json();

    if (data?.data) {
      console.log("%cGlobally Certified Data", "color : yellow", data?.data);
      return data?.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
