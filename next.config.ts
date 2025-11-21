import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/annual-reports",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/code-and-policies",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/shareholder-information",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
