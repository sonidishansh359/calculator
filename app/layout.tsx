import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    default: "Bharat Utility Hub - Professional Calculators & Tools by Dishansh Soni",
  },
  description: "Accurate, fast, and professional utility tools for Indian citizens and businesses. GST, EMI, SIP calculators built by Dishansh Soni from Nadiad.",
  keywords: [
    "utility tools", "calculators", "India", "GST calculator", "EMI calculator", 
    "SIP calculator", "Dishansh Soni", "Nadiad", "Bharat Hub", "financial tools"
  ],
  authors: [{ name: "Dishansh Soni" }],
  creator: "Dishansh Soni",
  publisher: "Dishansh Soni",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://calculator-two-bay-12.vercel.app", // The current live URL
    title: "Bharat Utility Hub - Professional Calculators by Dishansh Soni",
    description: "Accurate, fast, and professional utility tools for Indian citizens. Made with love in Nadiad by Dishansh Soni.",
    siteName: "Bharat Utility Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Utility Hub - Professional Calculators",
    description: "Accurate, fast, and professional utility tools for Indian citizens. Built by Dishansh Soni from Nadiad.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen flex flex-col`}>
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
