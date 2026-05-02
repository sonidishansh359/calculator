"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Calculator } from "lucide-react";
import { calculateGST } from "@/utils/calculators";
import { cn } from "@/utils/cn";

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<"add" | "remove">("add");
  const [results, setResults] = useState({ gstAmount: 0, totalAmount: 0 });

  const gstRates = [3, 5, 12, 18, 28];

  useEffect(() => {
    setResults(calculateGST(amount, rate, type));
  }, [amount, rate, type]);

  return (
    <ToolLayout
      title="GST Calculator"
      description="Professional Goods and Services Tax calculator updated for the latest Indian tax slabs."
      icon={<Calculator />}
      faqs={[
        { question: "How to calculate GST?", answer: "To add GST: Net Amount * (GST Rate / 100). To remove GST: Total Amount - (Total Amount * (100 / (100 + GST Rate)))." },
        { question: "What are common GST rates?", answer: "In India, common rates are 5%, 12%, 18%, and 28%. A special 3% rate applies to gold." }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="label-text">Base Amount (₹)</label>
            <div className="input-group">
              <span className="input-prefix">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="label-text">Select GST Rate (%)</label>
            <div className="flex flex-wrap gap-2">
              {gstRates.map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium text-sm transition-colors border",
                    rate === r
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-text mb-2">Calculation Mode</label>
            <div className="flex gap-2">
              <button
                onClick={() => setType("add")}
                className={cn(
                  "flex-1 py-2.5 rounded-md text-sm font-medium transition-colors border",
                  type === "add"
                    ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Add GST
              </button>
              <button
                onClick={() => setType("remove")}
                className={cn(
                  "flex-1 py-2.5 rounded-md text-sm font-medium transition-colors border",
                  type === "remove"
                    ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                Remove GST
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
             <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Calculation Summary</h3>

             <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <span className="text-slate-600 dark:text-slate-400">Net Amount</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {type === "add" ? amount.toLocaleString() : results.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex flex-wrap justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <div className="flex flex-col min-w-0">
                     <span className="text-slate-600 dark:text-slate-400">GST Amount ({rate}%)</span>
                     <span className="text-xs text-slate-500">CGST ({(rate/2).toFixed(1)}%) + SGST ({(rate/2).toFixed(1)}%)</span>
                  </div>
                  <span className="font-semibold text-brand-600 dark:text-brand-400 text-right">₹ {results.gstAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex flex-wrap justify-between items-center py-4 mt-2 gap-x-4">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">Final Amount</span>
                  <span className="font-bold text-slate-900 dark:text-white text-2xl text-right">
                    ₹ {type === "add" ? results.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) : amount.toLocaleString()}
                  </span>
                </div>
             </div>
        </div>
      </div>
    </ToolLayout>
  );
}
