"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-6 border border-brand-100 dark:border-brand-800">
                <Globe className="w-3.5 h-3.5" />
                <span>Our Mission</span>
              </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Empowering India with <span className="text-brand-600">Precision Tools</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bharat Utility Hub provides free, highly accurate, and privacy-focused digital tools for everyday financial and personal calculations.
            </p>
          </div>

          <div className="card p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Who We Are</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
               <p>
                 We understand that financial calculations like GST, EMI, and SIP planning require absolute accuracy and up-to-date tax slab information. That is why we built Bharat Utility Hub—a centralized platform dedicated specifically to Indian citizens and businesses.
               </p>
               <p>
                 Our tools are engineered to be fast, responsive, and completely secure. We do not store your calculation data on our servers, ensuring your financial privacy is fully respected.
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
                { icon: <Zap className="w-5 h-5" />, title: "High Performance", desc: "Instant calculations with zero latency or loading screens." },
                { icon: <Shield className="w-5 h-5" />, title: "Data Privacy", desc: "100% client-side processing. Your data never leaves your browser." },
                { icon: <Users className="w-5 h-5" />, title: "User Centric", desc: "Clean, professional interfaces designed for productivity." }
             ].map((feature, i) => (
                <div key={i} className="card p-6 border-t-4 border-t-brand-500">
                   <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 mb-4">
                     {feature.icon}
                   </div>
                   <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
