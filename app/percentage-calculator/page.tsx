"use client";

import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [val1, setVal1] = useState<number>(20);
  const [val2, setVal2] = useState<number>(100);
  
  const [val3, setVal3] = useState<number>(40);
  const [val4, setVal4] = useState<number>(200);
  
  const res1 = (val1 / 100) * val2;
  const res2 = (val3 / val4) * 100;

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Quickly calculate percentages for exam marks, discounts, or general math. Two calculators in one."
      icon={<Percent />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Calc 1 */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-6 text-slate-900 dark:text-white">What is X% of Y?</h3>
            <div className="flex items-center gap-3 mb-8">
              <input 
                type="number" 
                value={val1} 
                onChange={e => setVal1(Number(e.target.value))}
                className="input-field w-24 text-center"
              />
              <span className="font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">% of</span>
              <input 
                type="number" 
                value={val2} 
                onChange={e => setVal2(Number(e.target.value))}
                className="input-field w-32 text-center"
              />
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Result</div>
            <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">{res1.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Calc 2 */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-6 text-slate-900 dark:text-white">X is what % of Y?</h3>
            <div className="flex items-center gap-3 mb-8">
              <input 
                type="number" 
                value={val3}
                onChange={e => setVal3(Number(e.target.value))}
                className="input-field w-24 text-center"
              />
              <span className="font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">is what % of</span>
              <input 
                type="number" 
                value={val4}
                onChange={e => setVal4(Number(e.target.value))}
                className="input-field w-32 text-center"
              />
            </div>
          </div>
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Result</div>
            <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">{isFinite(res2) ? res2.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}%</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
