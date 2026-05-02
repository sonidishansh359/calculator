"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Contact Support
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have a question about our tools or need to report an issue? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email Support", val: "sonidishansh359@gmail.com" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", val: "+91 78628 85851" },
              ].map((item, i) => (
                <div key={i} className="card p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.val}</p>
                  </div>
                </div>
              ))}

              <div className="card p-6 bg-slate-900 dark:bg-slate-800 text-white border-none mt-8">
                <h3 className="font-bold mb-2">Business Hours</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our technical support team is available Monday through Friday, 9:00 AM to 6:00 PM IST.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="card p-8 md:p-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-text">Full Name</label>
                      <input type="text" className="input-field" />
                    </div>
                    <div>
                      <label className="label-text">Email Address</label>
                      <input type="email" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Subject</label>
                    <input type="text" className="input-field" />
                  </div>
                  <div>
                    <label className="label-text">Message</label>
                    <textarea rows={6} className="input-field resize-y"></textarea>
                  </div>
                  <div className="pt-2">
                    <button className="btn-primary w-full sm:w-auto">
                      <Send className="w-4 h-4" />
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
