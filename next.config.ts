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
    turbopack: {
      root: process.cwd(),
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "admin.aarti-industries.com",
        },
        {
          protocol: "https",
          hostname: "**.cloudfront.net",
        },
      ],
      formats: ["image/avif", "image/webp"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
      qualities: [70, 75, 80],
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
