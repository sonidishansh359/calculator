import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Globe,
  LayoutGrid
} from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Tools",
      links: [
        { name: "GST Calculator", href: "/gst-calculator" },
        { name: "EMI Calculator", href: "/emi-calculator" },
        { name: "Age Calculator", href: "/age-calculator" },
        { name: "SIP Calculator", href: "/sip-calculator" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
      ],
    },

  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 premium-gradient rounded-xl">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold font-outfit tracking-tight bg-clip-text text-transparent premium-gradient">
                BHARAT UTILITY HUB
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              India&apos;s most accurate and fast utility tools platform. Solving daily life problems with digital precision.
            </p>
            <div className="flex space-x-4">
              <Link href="mailto:sonidishansh359@gmail.com" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full hover:text-brand-500 transition-colors shadow-sm">
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Bharat Utility Hub. Built with ❤️ for India.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Sitemap
            </Link>
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <Globe className="w-4 h-4" />
              <span>English (India)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
