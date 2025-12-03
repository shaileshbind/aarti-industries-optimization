import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/investors/disclosures",
        destination: "/investors/disclosures/disclosure",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
