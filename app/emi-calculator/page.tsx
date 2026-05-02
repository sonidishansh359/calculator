"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Wallet } from "lucide-react";
import { calculateEMI } from "@/utils/calculators";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(20);
  const [results, setResults] = useState({ emi: 0, totalPayable: 0, totalInterest: 0 });

  useEffect(() => {
    setResults(calculateEMI(principal, rate, years));
  }, [principal, rate, years]);

  return (
    <ToolLayout
      title="EMI Calculator"
      description="Estimate your monthly loan installments for Home, Car, or Personal loans."
      icon={<Wallet />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label-text mb-0">Loan Amount (₹)</label>
              <input 
                type="number" 
                value={principal} 
                onChange={e => setPrincipal(Number(e.target.value))}
                className="input-field w-32 py-1.5 px-3 text-right"
              />
            </div>
            <input
              type="range"
              min="100000"
              max="20000000"
              step="50000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Interest Rate (%)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{rate}%</div>
             </div>
             <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Tenure (Years)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{years} yrs</div>
             </div>
             <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-5">
           <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-center">Repayment Summary</h3>
              
              <div className="text-center mb-8">
                 <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Monthly EMI</div>
                 <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">₹ {Math.round(results.emi).toLocaleString()}</div>
              </div>

              <div className="space-y-4">
                 <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Principal Amount</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {principal.toLocaleString()}</span>
                 </div>
                 <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total Interest</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {Math.round(results.totalInterest).toLocaleString()}</span>
                 </div>
                 <div className="flex flex-wrap justify-between items-center py-3 mt-2 gap-x-4">
                    <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                    <span className="font-bold text-slate-900 dark:text-white text-xl text-right">₹ {Math.round(results.totalPayable).toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
