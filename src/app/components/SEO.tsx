import Script from "next/script";

interface SEOProps {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  schemaData?: Record<string, unknown>;
  ogURL?: string;
  ogImg?: string;
  ogTitle?: string;
  ogDesc?: string;
  twtUrl?: string;
  twtImg?: string;
  twtTitle?: string;
  twtDesc?: string;
}

const SEO = ({
  // title,
  metaTitle,
  metaDescription,
  keywords,
  canonical,
  robots,
  schemaData,
  ogURL,
  ogImg,
  ogTitle,
  ogDesc,
  twtUrl,
  twtImg,
  twtTitle,
  twtDesc,
}: SEOProps) => {
  return (
    <>
      {/* Basic Meta Tags */}
      {metaTitle && <title>{metaTitle}</title>}
      {metaTitle && <meta name="title" content={metaTitle} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots meta tag */}
      {robots && <meta name="robots" content={robots} />}

      {/* Schema  */}
      {schemaData && (
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData, null, 2),
          }}
        />
      )}

      {/* Open Graph/ Facebook */}
      <meta property="og:type" content="website" />
      {ogURL && <meta property="og:url" content={ogURL} />}
      {ogImg && <meta property="og:image" content={ogImg} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDesc && <meta property="og:description" content={ogDesc} />}
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {twtUrl && <meta property="twitter:url" content={twtUrl} />}
      {twtImg && <meta property="twitter:image" content={twtImg} />}
      {twtTitle && <meta property="twitter:title" content={twtTitle} />}
      {twtDesc && <meta property="twitter:description" content={twtDesc} />}

      {process.env.NEXT_PUBLIC_IS_PRODUCTION === "true" && (
        <>
         {/* old gsc tag */}
         <meta name="google-site-verification" content="GA8nyFDRjrpm5mj-qBTeQujkpWYo6s9vkMeCh2iiGbw" />
         <meta name="google-site-verification" content="OLmTSpUVBh-u1lFFDhiVDM7x7wuOGJIuIo-VTleJN9M" />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GT-NNZ3VBMJ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GT-NNZ3VBMJ');
        `}
          </Script>
        </>
      )}
    </>
  );
};

export default SEO;
