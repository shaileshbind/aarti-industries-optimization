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
    const apiToken = process.env.API_TOKEN;
    if (!baseUrl) {
      return [];
    }
    if (!apiToken) {
      return [];
    }

    const endpoint = `${baseUrl}/redirects?filters[isActive]=true&populate=*`;
    const response = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
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
  } catch {
    return [];
  }
}
