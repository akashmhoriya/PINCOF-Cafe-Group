import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowUp, ArrowRight } from 'lucide-react';
import { Instagram, Facebook } from './Icons';
import { PINCOF_INFO } from '../data/pincofInfo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0b0604] text-[#ede5d8] border-t border-espresso-800/80 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-caramel-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-espresso-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-3 mb-5 group select-none">
              <div className="w-10 h-10 rounded-full border border-caramel-400/40 bg-caramel-500/10 flex items-center justify-center transition-all group-hover:border-caramel-400 group-hover:bg-caramel-500/20">
                <Layers className="w-5 h-5 text-caramel-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.25em] font-light text-cream-100 group-hover:text-caramel-300 transition-colors">
                  PINCOF
                </span>
                <span className="text-[9px] tracking-[0.3em] text-caramel-400/80 uppercase font-sans -mt-1 font-medium">
                  Café &amp; Coffee Group
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream-300/70 font-sans leading-relaxed mb-6 max-w-sm font-light">
              Building distinctive café brands for modern communities. Incubating, operating, and scaling visionary coffee concepts across global markets.
            </p>

            <div className="flex items-center space-x-3">
              <a
                href={PINCOF_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-cursor="link"
                className="px-3 py-1.5 rounded-full border border-cream-300/10 text-xs font-sans text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={PINCOF_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor="link"
                className="w-8 h-8 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com/pincofgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                data-cursor="link"
                className="w-8 h-8 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 hover:text-caramel-400 hover:border-caramel-400/50 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-3.5 text-xs font-sans tracking-wider">
              <li>
                <Link to="/about" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link to="/offerings" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Product Offering
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Franchise
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-300/80 hover:text-caramel-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Brands Portfolio */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              Portfolio Brands
            </h3>
            <ul className="space-y-3 text-xs font-sans tracking-wide">
              <li>
                <Link to="/brands/aurelia-slow-bar" className="text-cream-300/80 hover:text-caramel-400 transition-colors block">
                  Aurelia Slow Bar &amp; Roastery
                </Link>
                <span className="text-[10px] text-cream-400/50 uppercase tracking-widest font-mono">Specialty Coffee</span>
              </li>
              <li>
                <Link to="/brands/kanso-espresso" className="text-cream-300/80 hover:text-caramel-400 transition-colors block">
                  Kanso Espresso Lab
                </Link>
                <span className="text-[10px] text-cream-400/50 uppercase tracking-widest font-mono">Modern Café</span>
              </li>
              <li>
                <Link to="/brands/verdant-botanical" className="text-cream-300/80 hover:text-caramel-400 transition-colors block">
                  Verdant Botanical Café
                </Link>
                <span className="text-[10px] text-cream-400/50 uppercase tracking-widest font-mono">Botanical House</span>
              </li>
              <li>
                <Link to="/brands/maison-molen" className="text-cream-300/80 hover:text-caramel-400 transition-colors block">
                  Maison &amp; Molen Bakery Café
                </Link>
                <span className="text-[10px] text-cream-400/50 uppercase tracking-widest font-mono">Coffee &amp; Bakery</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Partners & Franchise */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-6">
              Partnerships
            </h3>
            <p className="text-xs text-cream-300/70 font-sans leading-relaxed mb-4">
              We partner with visionary hospitality operators to license and scale high-margin café concepts.
            </p>
            <Link
              to="/franchise"
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-caramel-400 hover:text-caramel-300 font-semibold transition-colors"
            >
              <span>Franchise With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="mt-6 pt-4 border-t border-espresso-800/80 text-[11px] text-cream-400/50 font-sans space-y-1">
              <p>Corporate HQ: San Francisco, CA</p>
              <p>Partner Enquiries: {PINCOF_INFO.partnersEmail}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream-400/50">
          <p>© 2026 PINCOF. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-caramel-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-caramel-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1 hover:text-caramel-400 transition-colors group"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
