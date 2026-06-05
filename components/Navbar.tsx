"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Search, 
  ChevronDown,
  LayoutGrid,
  User,
  LogIn,
  LogOut,
  Lock,
  X,
  Loader2
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { tools } from "@/data/tools";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Auth state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const searchRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Check login status on mount
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.loggedIn) {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
      }
    };
    
    checkLoginStatus();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) {
        setShowAdminDropdown(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdmin(true);
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
        setToastMessage("You are Super Admin now!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setIsAdmin(false);
        setShowAdminDropdown(false);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Tools", 
      href: "/#tools", 
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
    <>
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
                    className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 py-5 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="w-3.5 h-3.5 opacity-55 transition-transform duration-300 group-hover:-rotate-180" />}
                    {/* Advanced Hover Underline */}
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-600 rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
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
            <div className="relative flex-grow max-w-[150px] sm:max-w-xs md:max-w-sm" ref={searchRef}>
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
                              {React.createElement(tool.icon as React.ElementType, { className: "w-4 h-4" })}
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

            {/* Admin Authentication Action */}
            <div className="relative shrink-0 flex items-center" ref={adminDropdownRef}>
              {isAdmin ? (
                <div className="relative">
                  <button
                    onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 dark:text-brand-300 dark:bg-brand-950/40 dark:hover:bg-brand-900/40 border border-brand-200 dark:border-brand-800/80 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[10px]">
                      AD
                    </div>
                    <span className="hidden sm:inline">Admin</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-55" />
                  </button>

                  <AnimatePresence>
                    {showAdminDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-[130]"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/50 mb-1">
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Logged In As</p>
                          <p className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 mt-0.5">
                            <span>👑</span> Super Admin
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation Row - Only Visible on Small Screens */}
          <div className="flex md:hidden justify-center items-center gap-6 overflow-x-auto no-scrollbar pb-3 pt-3 border-t border-slate-100 dark:border-slate-800/50">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="relative group text-[11px] sm:text-xs font-extrabold text-slate-600 dark:text-slate-400 hover:text-brand-600 whitespace-nowrap uppercase tracking-wider transition-colors py-1 px-1"
              >
                {link.name}
                {/* Advanced Hover Underline */}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo / Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="p-3 bg-brand-100 dark:bg-brand-950/50 rounded-2xl text-brand-600 dark:text-brand-400 mb-3 shadow-inner">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Admin Authentication</h3>
                <p className="text-xs text-slate-500 mt-1">Access the administrator panel controls</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-xs rounded-lg font-medium text-center">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Log In</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-[250] max-w-sm w-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200 rounded-xl shadow-2xl p-4 flex items-center gap-3 backdrop-blur-md"
          >
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">Successfully Authenticated</h4>
              <p className="text-xs text-slate-300 dark:text-slate-600 font-semibold">{toastMessage}</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="p-1 text-slate-400 hover:text-white dark:hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
