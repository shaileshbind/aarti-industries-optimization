/* eslint-disable */
export interface HeaderFooterData {
  Header: any;
  Footer: any;
}

export async function fetchHeaderFooterData(): Promise<HeaderFooterData> {
  try {
    console.log("🔍 BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/header-footer`,
      {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        next: { revalidate: 1 }, 
      }
    );
    console.log("🔍 RESPONSE STATUS:", res.status);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    console.log("🔍 RESPONSE STATUS + data:", res.status, responseData);
    return responseData.data; 
  } catch (error) {
    console.error("Failed to fetch header and footer data:", error);

    return {
      Header: {},
      Footer: {},
    };
  }
}
