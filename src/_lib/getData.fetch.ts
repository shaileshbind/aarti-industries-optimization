export const getData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/globally-certified-datas?populate=*`,
      {
        cache: "no-store",
      }
    );

    // Handle non-OK response
    if (!response.ok) {
      throw new Error("Failed to fetch with response not ok");
    }

    const data = await response.json();

    if (data?.data) {
      console.log("%cGlobally Certified Data", "color : yellow", data?.data);
      return data?.data;
    }
  } catch (error) {}
};
