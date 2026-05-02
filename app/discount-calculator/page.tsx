"use client";

import React, { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Tag } from "lucide-react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState<number>(1000);
  const [discount, setDiscount] = useState<number>(20);
  const [tax, setTax] = useState<number>(0);
  
  const discountAmount = (price * discount) / 100;
  const priceAfterDiscount = price - discountAmount;
  const taxAmount = (priceAfterDiscount * tax) / 100;
  const finalPrice = priceAfterDiscount + taxAmount;

  return (
    <ToolLayout
      title="Discount Calculator"
      description="Calculate final prices during sales. Find out exactly how much you save and what the final price is after taxes."
      icon={<Tag />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div>
            <label className="label-text">Original Price (₹)</label>
            <div className="input-group">
              <span className="input-prefix">₹</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label className="label-text">Discount (%)</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">%</div>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="label-text">Tax / GST (%)</label>
             <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">%</div>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 h-full flex flex-col justify-center">
           <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-center">Price Breakdown</h3>
           
           <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">Original Price</span>
                <span className="font-medium text-slate-500 line-through text-right">₹ {price.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                <span className="text-sm font-bold text-green-600 dark:text-green-500">You Save</span>
                <span className="font-bold text-green-600 dark:text-green-500 text-right">- ₹ {discountAmount.toLocaleString()}</span>
              </div>
              {tax > 0 && (
                <div className="flex flex-wrap justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 gap-x-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Tax Amount</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right">+ ₹ {taxAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex flex-wrap justify-between items-center py-4 mt-2 gap-x-4">
                <span className="font-bold text-slate-900 dark:text-white text-lg">Final Price</span>
                <span className="font-bold text-brand-600 dark:text-brand-400 text-2xl text-right">₹ {finalPrice.toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>
    </ToolLayout>
  );
}
