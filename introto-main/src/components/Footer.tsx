import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Download } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle e-book download
    if (email) {
      alert(`Thank you! Download link sent to ${email}!`);
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm" style={{ fontFamily: 'Calibri, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-8 sm:mb-12 items-stretch gap-6 lg:gap-8">
          {/* Panel 1 - Introto Newsletter */}
          <div className="flex flex-col h-full sm:col-span-2 lg:col-span-2 lg:mr-8">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 self-center"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="4" fill="white"/>
              </svg>
              <span className="text-2xl sm:text-3xl text-white font-bold leading-none flex items-center">introto.in</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto px-4 sm:px-0 mb-4 leading-loose text-justify" style={{ wordSpacing: '-0.05em' }}>
              Bringing Bharatiya wisdom to modern learners through beautifully crafted digital courses. Join thousands of seekers worldwide rediscovering clarity, purpose and living knowledge with <span className="text-blue-300">Introto</span>.
            </p>
            <div className="mb-4">
              <h3 className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4 sm:px-0 italic mb-3 font-bold">Download Free E-book on Indian Knowledge Systems</h3>
              <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-56 px-3 py-2 text-sm rounded-lg bg-black/30 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </form>
            </div>
          </div>

          {/* Panel 2 - Connect */}
          <div className="flex flex-col h-full">
            <h3 className="text-white mb-4 text-base font-bold">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Panel 3 - Company */}
          <div className="flex flex-col h-full">
            <h3 className="text-white mb-4 text-base font-bold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Creative Team
                </a>
              </li>
            </ul>
          </div>

          {/* Panel 4 - Legal */}
          <div className="flex flex-col h-full">
            <h3 className="text-white mb-4 text-base font-bold">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-white/70 text-sm text-center">
              © 2025 Introto. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


