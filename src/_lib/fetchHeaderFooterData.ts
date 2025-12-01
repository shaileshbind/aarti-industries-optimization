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
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        next: { revalidate: 1 },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const responseData = await res.json();

    return responseData.data;
  } catch (error) {
    console.error("Failed to fetch header and footer data:", error);

    return {
      Header: {},
      Footer: {},
    };
  }
}
