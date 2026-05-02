export const SEO_CONFIG = {
  siteName: "Bharat Utility Hub",
  baseUrl: "https://bharatutilityhub.com",
  defaultTitle: "Bharat Utility Hub | India's #1 Daily Utility Tools by Dishansh Soni",
  defaultDescription: "Free, fast, and accurate utility tools for Indian users. GST, EMI, Age, SIP calculators and more. Built by Dishansh Soni from Nadiad.",
  twitterHandle: "@BharatUtilityHub",
};

export const getMetadata = (title?: string, description?: string, path?: string) => {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  const fullDescription = description || SEO_CONFIG.defaultDescription;
  const url = `${SEO_CONFIG.baseUrl}${path || ""}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SEO_CONFIG.siteName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      creator: SEO_CONFIG.twitterHandle,
    },
  };
};
