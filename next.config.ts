import type { NextConfig } from "next";
import { getSecret } from "./utils/awsSecret";

const secretName = process.env.AWS_SECRET_NAME;
const environment = process.env.NEXT_PUBLIC_IS_PRODUCTION;

const nextConfig = async () => {
  const awsSecrets =
    secretName && environment === "true" ? await getSecret(secretName) : null;
  // console.log("AWS_SECRET_NAME:", secretName);
  // console.log("ENVIRONMENT:", environment);

  if (environment === "true" && awsSecrets) {
    // console.log("Fetched AWS Secrets for production true:", awsSecrets);
  }

  const nextConfigObject: Partial<NextConfig> = {
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    turbopack: {
      root: process.cwd(),
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: environment === "true" ? "admin.aarti-industries.com" : "staging.api.aarti-industries.com",
        },
        {
          protocol: "https",
          hostname: "**.cloudfront.net",
        },
      ],
      formats: ["image/avif", "image/webp"],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400],
      deviceSizes: [350, 450, 640, 750, 828, 1080, 1200, 1920],
      qualities: [70, 75, 80],
      // CMS assets carry content hashes in their file names, so optimized
      // variants can be cached far longer than the 60s default (was 4h).
      minimumCacheTTL: 2678400,
    },

    async headers() {
      // Files in public/ are served with max-age=0 by default; these change
      // rarely, so let browsers keep them for a day and revalidate in the background.
      const publicAssets = {
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      };
      return [
        { source: "/images/:path*", ...publicAssets },
        { source: "/maps/:path*", ...publicAssets },
        { source: "/js/:path*", ...publicAssets },
      ];
    },
    compiler: {
      removeConsole: environment === "true",
    },

    async redirects() {
      return [
        {
          source: "/investors/disclosures",
          destination: "/investors/disclosures/overview",
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

  if (environment === "true" && awsSecrets) {
    nextConfigObject.env = { ...(awsSecrets as Record<string, string>) };
  }

  // console.log("Final nextConfigObject:", nextConfigObject);

  return nextConfigObject as NextConfig;
};

export default nextConfig;