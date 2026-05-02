"use client";

import React, { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Calendar } from "lucide-react";
import { calculateAge } from "@/utils/calculators";

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>("1995-01-01");
  const [results, setResults] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    if (dob) {
      setResults(calculateAge(new Date(dob)));
    }
  }, [dob]);

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate exact age in years, months, and days for formal applications."
      icon={<Calendar />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Input */}
        <div className="space-y-6">
           <div>
              <label className="label-text">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input-field"
              />
           </div>
        </div>

        {/* Output */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-center">Calculated Age</h3>

           <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                 <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{results.years}</div>
                 <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Years</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                 <div className="text-3xl font-bold text-slate-900 dark:text-white">{results.months}</div>
                 <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Months</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                 <div className="text-3xl font-bold text-slate-900 dark:text-white">{results.days}</div>
                 <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Days</div>
              </div>
           </div>

           <div className="flex justify-around pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-center">
                 <div className="text-lg font-bold text-slate-900 dark:text-white">{results.years * 12 + results.months}</div>
                 <div className="text-xs font-medium text-slate-500">Total Months</div>
              </div>
              <div className="text-center">
                 <div className="text-lg font-bold text-slate-900 dark:text-white">{Math.floor(results.years * 365.25 + results.months * 30.44 + results.days)}</div>
                 <div className="text-xs font-medium text-slate-500">Total Days</div>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
