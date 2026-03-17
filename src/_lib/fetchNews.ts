export const fetchNews = async (slug: string) => {
  try {
    const response = await fetch(slug, {
      next: { revalidate: 300 },
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
