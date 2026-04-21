// utils/awsSecrets.ts
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// Initialize the Secrets Manager client
const region = process.env.AWS_REGION || "us-east-1";
// console.log(`[AWS Secrets Manager] Initializing client with region: ${region}`);
const client = new SecretsManagerClient({
  region,
});

/**
 * Fetches a secret from AWS Secrets Manager.
 * @param secretName - The name of the secret in AWS Secrets Manager.
 * @returns The secret as a parsed object.
 */
export async function getSecret(
  secretName: string,
): Promise<Record<string, unknown>> {
  // console.log(`[AWS Secrets Manager] Fetching secret: ${secretName}`);
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );

    if (response.SecretString) {
      const parsedSecret = JSON.parse(response.SecretString);
      return parsedSecret;
    } else {
      console.error(
        `[AWS Secrets Manager] Secret binary format not supported for: ${secretName}`,
      );
      throw new Error("Secret binary not supported");
    }
  } catch (error) {
    console.error(
      `[AWS Secrets Manager] Error fetching secret "${secretName}":`,
      error,
    );
    throw error;
  }
}
