"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Share2, Printer, HelpCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  faqs?: FAQ[];
  seoContent?: React.ReactNode;
}

const ToolLayout = ({ title, description, icon, children, faqs, seoContent }: ToolLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Tools
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-brand-600">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">{title}</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calculator Container */}
          <div className="card p-6 md:p-8 mb-12">
             {children}
          </div>

          {/* SEO / Detailed Info */}
          {seoContent && (
            <div className="prose prose-slate dark:prose-invert max-w-none mb-12 bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {seoContent}
            </div>
          )}

          {/* FAQ Section */}
          {faqs && (
            <div className="card p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <HelpCircle className="w-5 h-5 text-slate-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolLayout;
