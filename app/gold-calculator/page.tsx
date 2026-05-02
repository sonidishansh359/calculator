"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Coins } from "lucide-react";
import { calculateGold } from "@/utils/calculators";
import { cn } from "@/utils/cn";

export default function GoldCalculator() {
  const [weight, setWeight] = useState<number>(10);
  const [rate, setRate] = useState<number>(75000); // per 10g
  const [making, setMaking] = useState<number>(10); // percent
  const [purity, setPurity] = useState<number>(24);
  const [results, setResults] = useState({ basePrice: 0, withMaking: 0, gstAmount: 0, finalPrice: 0 });

  useEffect(() => {
    const adjustedRate = (rate / 24) * purity;
    const makingCharges = (weight * adjustedRate * making) / 100;
    setResults(calculateGold(weight, adjustedRate, makingCharges));
  }, [weight, rate, making, purity]);

  return (
    <ToolLayout
      title="Gold Price Calculator"
      description="Estimate the final market value of gold jewelry including making charges and GST."
      icon={<Coins />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Inputs */}
        <div className="space-y-6">
          <div>
            <label className="label-text">Select Gold Purity</label>
            <div className="flex gap-2">
              {[18, 22, 24].map((k) => (
                <button
                  key={k}
                  onClick={() => setPurity(k)}
                  className={cn(
                    "flex-1 py-2 rounded-md font-medium text-sm transition-colors border",
                    purity === k
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {k}K
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Weight (g)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Rate per 10g (24K)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Making Charges (%)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{making}%</div>
             </div>
             <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={making}
              onChange={(e) => setMaking(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
             <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-center">Valuation Summary</h3>

             <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Gold Value ({purity}K)</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {results.basePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Making Charges ({making}%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {(results.withMaking - results.basePrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">GST (3%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">₹ {results.gstAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex flex-wrap justify-between items-center py-4 mt-2 gap-x-4">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">Total Price</span>
                  <span className="font-bold text-amber-600 dark:text-amber-500 text-2xl text-right">
                    ₹ {Math.round(results.finalPrice).toLocaleString()}
                  </span>
                </div>
             </div>
             
             <p className="text-xs text-slate-500 text-center mt-6">
                Prices are estimated based on your input.
             </p>
        </div>
      </div>
    </ToolLayout>
  );
}
