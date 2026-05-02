"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Heart } from "lucide-react";
import { calculateBMI } from "@/utils/calculators";

export default function BMICalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [results, setResults] = useState({ bmi: 0, category: "" });

  useEffect(() => {
    setResults(calculateBMI(weight, height));
  }, [weight, height]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Underweight": return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400";
      case "Normal": return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400";
      case "Overweight": return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400";
      case "Obese": return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400";
      default: return "text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400";
    }
  };

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index to see if you are at a healthy weight."
      icon={<Heart />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Inputs */}
        <div className="space-y-8">
           <div>
              <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Weight (kg)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{weight}</div>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
           </div>

           <div>
              <div className="flex justify-between items-center mb-2">
                <label className="label-text mb-0">Height (cm)</label>
                <div className="font-semibold text-slate-900 dark:text-white">{height}</div>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                step="1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
           </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center items-center text-center">
             <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Health Score</h3>

             <div className="mb-6">
                <div className="text-6xl font-bold text-slate-900 dark:text-white leading-none mb-4">{results.bmi.toFixed(1)}</div>
                <div className={`inline-flex px-4 py-1.5 rounded-full font-semibold border ${getCategoryColor(results.category)}`}>
                  {results.category}
                </div>
             </div>

             <div className="w-full mt-4">
                 <div className="grid grid-cols-4 gap-1 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-blue-400" />
                    <div className="bg-green-400" />
                    <div className="bg-orange-400" />
                    <div className="bg-red-400" />
                 </div>
                 <div className="flex justify-between text-[10px] font-medium text-slate-500 uppercase">
                    <span>Under</span>
                    <span>Normal</span>
                    <span>Over</span>
                    <span>Obese</span>
                 </div>
             </div>
        </div>
      </div>
    </ToolLayout>
  );
}
