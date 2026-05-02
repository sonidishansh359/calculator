"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronDown,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { tools } from "@/data/tools";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  const filteredTools = searchQuery.trim() === "" 
    ? [] 
    : tools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleToolClick = (href: string) => {
    setShowDropdown(false);
    setSearchQuery("");
    router.push(href);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Tools", 
      href: "#", 
      subLinks: [
        { name: "GST Calculator", href: "/gst-calculator" },
        { name: "EMI Calculator", href: "/emi-calculator" },
        { name: "SIP Calculator", href: "/sip-calculator" },
        { name: "Gold Calculator", href: "/gold-calculator" },
      ]
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Row: Logo and Search/Actions */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="p-1.5 bg-brand-600 rounded-lg">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Bharat Hub
            </span>
          </Link>

          {/* Desktop Nav Links - Hidden on Mobile, Shown on Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 py-5"
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                </Link>
                
                {link.subLinks && (
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[110]">
                    <div className="w-48 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 rounded-md transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Global Search Bar */}
          <div className="relative flex-grow max-w-[200px] sm:max-w-xs md:max-w-md" ref={searchRef}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search tools..." 
              className="w-full pl-9 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
            />
            
            {/* Search Dropdown */}
            <AnimatePresence>
              {showDropdown && searchQuery.trim() !== "" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-full min-w-[280px] sm:min-w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-[120]"
                >
                  {filteredTools.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto py-2">
                      {filteredTools.map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => handleToolClick(tool.href)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-start gap-3 border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                        >
                          <div className="text-brand-600 mt-0.5">
                            {React.cloneElement(tool.icon as React.ReactElement, { className: "w-4 h-4" })}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{tool.title}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{tool.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                      No results for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Navigation Row - Only Visible on Small Screens */}
        <div className="flex md:hidden items-center gap-5 overflow-x-auto no-scrollbar pb-3 pt-1 border-t border-slate-100 dark:border-slate-800/50">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-brand-600 whitespace-nowrap uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
