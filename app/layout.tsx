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
    default: "Bharat Utility Hub - GST Calculator, EMI Calculator, Age Calculator, SIP Calculator by Dishansh Soni",
  },
  description: "Accurate, fast, and professional utility tools for Indian citizens. GST Calculator, EMI Calculator, Age Calculator, and SIP Calculator built by Dishansh Soni from Nadiad.",
  keywords: [
    "GST Calculator", "EMI Calculator", "Age Calculator", "SIP Calculator", 
    "utility tools", "calculators", "India", "Dishansh Soni", "Nadiad", "Bharat Hub", "financial tools"
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
