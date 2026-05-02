import React from "react";
import { 
  Percent, 
  Wallet, 
  Calendar, 
  TrendingUp, 
  Coins, 
  Calculator, 
  Activity, 
  Tag 
} from "lucide-react";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: "Finance" | "Education" | "Gold" | "Health" | "Shopping";
  trending?: boolean;
}

export const tools: Tool[] = [
  {
    id: "gst",
    title: "GST Calculator",
    description: "Calculate Add/Remove GST (3%, 5%, 12%, 18%, 28%) instantly for Indian businesses.",
    icon: <Calculator className="w-6 h-6" />,
    href: "/gst-calculator",
    category: "Finance",
    trending: true,
  },
  {
    id: "emi",
    title: "EMI Calculator",
    description: "Calculate your monthly home, car, or personal loan EMIs with detailed breakdown.",
    icon: <Wallet className="w-6 h-6" />,
    href: "/emi-calculator",
    category: "Finance",
    trending: true,
  },
  {
    id: "age",
    title: "Age Calculator",
    description: "Find your exact age in years, months, and days from your date of birth.",
    icon: <Calendar className="w-6 h-6" />,
    href: "/age-calculator",
    category: "Education",
    trending: true,
  },
  {
    id: "sip",
    title: "SIP Calculator",
    description: "Estimate your future wealth from Mutual Fund SIP investments with expected returns.",
    icon: <TrendingUp className="w-6 h-6" />,
    href: "/sip-calculator",
    category: "Finance",
  },
  {
    id: "gold",
    title: "Gold Calculator",
    description: "Calculate gold price based on weight, purity, making charges, and GST.",
    icon: <Coins className="w-6 h-6" />,
    href: "/gold-calculator",
    category: "Gold",
    trending: true,
  },
  {
    id: "percentage",
    title: "Percentage Calculator",
    description: "Quickly calculate percentage gain/loss, exam marks, and general percentages.",
    icon: <Percent className="w-6 h-6" />,
    href: "/percentage-calculator",
    category: "Education",
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Check your Body Mass Index and health category based on height and weight.",
    icon: <Activity className="w-6 h-6" />,
    href: "/bmi-calculator",
    category: "Health",
  },
  {
    id: "discount",
    title: "Discount Calculator",
    description: "Find your final savings and price after applying discounts and taxes.",
    icon: <Tag className="w-6 h-6" />,
    href: "/discount-calculator",
    category: "Shopping",
  },
];
