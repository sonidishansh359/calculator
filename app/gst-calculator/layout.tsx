import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Free GST Calculator India – Add or Remove GST Instantly | Dishansh Utility Hub",
  },
  description: "Free Goods and Services Tax calculator for India. Add or remove GST instantly. Accurate, fast, and professional.",
};

export default function GSTCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
