import type { NextConfig } from "next";
import { getSecret } from "./utils/awsSecret";

const secretName = process.env.AWS_SECRET_NAME;
const environment = process.env.NEXT_PUBLIC_IS_PRODUCTION;

const nextConfig = async () => {
  const awsSecrets = (secretName && environment === "true") ? await getSecret(secretName) : null;
  console.log("AWS_SECRET_NAME:", secretName);
  console.log("ENVIRONMENT:", environment);

  if (environment === "true" && awsSecrets) {
    console.log("Fetched AWS Secrets for production true:", awsSecrets);
  }

  // const secrets = await getSecret(secretName as string);
  // console.log("Fetched Secrets:", secrets);

  const nextConfigObject: Partial<NextConfig> = {
    images: {
      unoptimized: true,
    },
    compiler: {
    removeConsole: environment === 'true'
  },
    // env: { ...secrets },

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
  }

  if (environment === "true" && awsSecrets) { 
    nextConfigObject.env = { ...(awsSecrets as Record<string, string>) };
  }

  console.log("Final nextConfigObject:", nextConfigObject);

  return nextConfigObject as NextConfig;
};

export default nextConfig;
