/* eslint-disable */
export interface HeaderFooterData {
  Header: any;
  Footer: any;
}

export async function fetchHeaderFooterData(): Promise<HeaderFooterData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/header-footer`,
      {
        headers: {
          "Content-Type": "application/json",
         // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        cache: "force-cache"
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    
    // Return the full response data structure
    return responseData.data 
  } catch (error) {
    console.error('Failed to fetch header and footer data:', error);
    // Provide fallback data structure
    return {
      Header: {},
      Footer: {}
    };
  }
} 