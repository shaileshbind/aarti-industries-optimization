/**
 * Fetches redirect mappings from the backend
 * Expected response format: { data: [{ oldUrl: string, newUrl: string }] }
 */
export interface RedirectMapping {
  oldUrl: string;
  newUrl: string;
}

export async function getRedirects(): Promise<RedirectMapping[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BASE_URL is not set");
      return [];
    }

    // Fetch redirects from backend
    // Adjust the endpoint path as needed based on your backend API
    const response = await fetch(`${baseUrl}/redirects`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch redirects: ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Handle different possible response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data?.data && Array.isArray(data.data)) {
      return data.data;
    } else if (data?.redirects && Array.isArray(data.redirects)) {
      return data.redirects;
    }

    return [];
  } catch (error) {
    console.error("Error fetching redirects:", error);
    return [];
  }
}

