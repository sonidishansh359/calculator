"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Target } from "lucide-react";
import { calculateSIP } from "@/utils/calculators";

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [results, setResults] = useState({ maturityValue: 0, totalInvestment: 0, estimatedReturns: 0 });

  useEffect(() => {
    setResults(calculateSIP(monthly, rate, years));
  }, [monthly, rate, years]);

  return (
    <ToolLayout
      title="SIP Calculator"
      description="Calculate estimated returns on your Mutual Fund Systematic Investment Plan (SIP)."
      icon={<Target />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sliders */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label-text mb-0">Monthly Investment (₹)</label>
              <input 
                type="number" 
                value={monthly} 
                onChange={e => setMonthly(Number(e.target.value))}
                className="input-field w-32 py-1.5 px-3 text-right"
              />
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Expected Return Rate (% p.a)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{rate}%</div>
             </div>
             <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Time Period (Years)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{years} yrs</div>
             </div>
             <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5">
           <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-center">Investment Summary</h3>
              
              <div className="text-center mb-8">
                 <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Estimated Maturity Value</div>
                 <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">₹ {Math.round(results.maturityValue).toLocaleString()}</div>
              </div>

              <div className="space-y-4">
                 <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Invested Amount</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {results.totalInvestment.toLocaleString()}</span>
                 </div>
                 <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Est. Returns</span>
                    <span className="font-semibold text-green-600 dark:text-green-500 text-right">+ ₹ {Math.round(results.estimatedReturns).toLocaleString()}</span>
                 </div>
              </div>
              <p className="text-xs text-slate-500 text-center mt-6">
                Mutual fund investments are subject to market risks.
              </p>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
