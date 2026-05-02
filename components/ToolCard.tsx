"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category: string;
  trending?: boolean;
}

const ToolCard = ({ title, description, icon, href, category, trending }: ToolCardProps) => {
  return (
    <Link href={href} className="block group h-full">
      <div className="card p-6 h-full flex flex-col hover:border-brand-500 transition-colors duration-200 relative overflow-hidden">
        
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-brand-600 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 transition-colors">
            {React.createElement(icon, { className: "w-5 h-5" })}
          </div>
          
          {trending && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
              Trending
            </span>
          )}
        </div>
        
        <div className="mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1 block">
            {category}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors leading-tight">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300">
          Calculate Now
          <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
