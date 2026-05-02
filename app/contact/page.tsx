"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  };

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

                {/* Success Banner */}
                {status === "success" && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-400">Message sent successfully!</p>
                      <p className="text-sm text-green-700 dark:text-green-500">We&apos;ll get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {status === "error" && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-400">{errorMsg}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-text">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-text">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-text">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label-text">Message</label>
                    <textarea
                      rows={6}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="input-field resize-y"
                    ></textarea>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {status === "loading" ? "Sending..." : "Submit Request"}
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
