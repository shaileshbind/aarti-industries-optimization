export const fetchNews = async (slug: string) => {
  try {
    const response = await fetch(slug, {
      next: { revalidate: 600 }, //increasing revalidate 300 to 600 (10mins)
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Client fetch error:", error);
    return null;
  }
};
