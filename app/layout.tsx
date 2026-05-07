import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Bharat Utility Hub",
    default: "Bharat Utility Hub - GST Calculator, EMI Calculator, Age Calculator, SIP Calculator by Dishansh Soni",
  },
  description: "Accurate, fast, and professional utility tools for Indian citizens. GST Calculator, EMI Calculator, Age Calculator, and SIP Calculator built by Dishansh Soni from Nadiad.",
  keywords: [
    // Main Keywords
    "GST Calculator", "EMI Calculator", "Age Calculator", "SIP Calculator", 
    "utility tools", "calculators", "India", "Dishansh Soni", "Nadiad", "Bharat Hub", "financial tools",
    
    // Spelling Mistakes & Variations (Dishansh Soni & Nadiad)
    "Dishans Soni", "Disansh Soni", "Dishant Soni", "Dishansh Sony", "Dishans", "Nadiyad", "Nadiad city", 
    
    // Spelling Mistakes & Variations (Tools)
    "GST calculater", "GTS calculator", "GST cal", "tax calculator india", 
    "EMI calculater", "loan calculater", "EMI cal", "home loan EMI", 
    "age calculater", "birth calculator", "age cal", "ajj calculator",
    "SIP calculater", "mutual fund calculator", "sip cal", "bharat utility", "utilty tools"
  ],
  authors: [{ name: "Dishansh Soni" }],
  creator: "Dishansh Soni",
  publisher: "Dishansh Soni",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calculator-two-bay-12.vercel.app",
    title: "Bharat Utility Hub - GST, EMI, Age & SIP Calculators",
    description: "Accurate, fast, and professional utility tools for Indian citizens. GST Calculator, EMI Calculator, Age Calculator, and SIP Calculator built by Dishansh Soni from Nadiad.",
    siteName: "Bharat Utility Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Utility Hub - Professional Calculators",
    description: "GST Calculator, EMI Calculator, Age Calculator, and SIP Calculator built by Dishansh Soni from Nadiad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "akMXbWcP1XnsjExLd4XjMJ2xo7ubAUX50Cw22l6d1Z0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1927851272832708"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen flex flex-col`}>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-77SWXJTWGL"
        />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-77SWXJTWGL');
          `
        }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
