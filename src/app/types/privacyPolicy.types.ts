export interface PrivacyContent {
  content: Array<{
    title?: string;
    description?: string | null;
    additional?: string | null;
  }>;
}
