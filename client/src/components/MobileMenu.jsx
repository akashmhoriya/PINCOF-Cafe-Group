import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ArrowRight, MapPin, Mail, Layers } from 'lucide-react';
import { Instagram, Facebook } from './Icons';
import gsap from 'gsap';
import { PINCOF_INFO } from '../data/pincofInfo';

export const MobileMenu = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const linksContainerRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          overlayRef.current,
          { opacity: 0, y: '-100%' },
          { opacity: 1, y: '0%', duration: 0.5, ease: 'power4.inOut' }
        );

        const links = linksContainerRef.current?.querySelectorAll('.mobile-nav-item');
        if (links && links.length > 0) {
          tl.fromTo(
            links,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
            '-=0.2'
          );
        }

        if (infoRef.current) {
          tl.fromTo(
            infoRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
            '-=0.2'
          );
        }
      }, overlayRef);

      return () => {
        ctx.revert();
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          document.body.style.overflow = '';
          onClose();
        },
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Brands', path: '/brands' },
    { name: 'Product Offering', path: '/offerings' },
    { name: 'About Us', path: '/about' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[9999] bg-[#140c08] text-[#faf7f2] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-caramel-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-caramel-900/30 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-cream-300/10 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border border-caramel-400/40 bg-caramel-500/15 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-caramel-400" />
          </div>
          <span className="font-serif text-2xl tracking-[0.25em] font-light text-cream-100">
            PINCOF
          </span>
        </div>
        <button
          onClick={handleClose}
          aria-label="Close menu"
          className="p-3 rounded-full bg-espresso-800/80 border border-cream-300/20 text-cream-200 hover:text-caramel-400 hover:border-caramel-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <div ref={linksContainerRef} className="relative z-10 my-auto py-8 flex flex-col space-y-6">
        {navLinks.map((link, idx) => (
          <div key={link.path} className="mobile-nav-item overflow-hidden">
            <NavLink
              to={link.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `group flex items-center justify-between font-serif text-3xl sm:text-4xl transition-all duration-300 ${
                  isActive ? 'text-caramel-400 pl-4' : 'text-cream-200 hover:text-white'
                }`
              }
            >
              <span>
                <span className="text-xs font-sans tracking-widest text-caramel-400/60 mr-3">
                  0{idx + 1}
                </span>
                {link.name}
              </span>
              <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-caramel-400" />
            </NavLink>
          </div>
        ))}

        <div className="mobile-nav-item pt-4">
          <NavLink
            to="/franchise"
            onClick={handleClose}
            className="w-full py-4 rounded-full bg-caramel-500 text-espresso-950 font-sans text-center text-xs font-semibold tracking-[0.2em] uppercase block hover:bg-caramel-400 transition-colors shadow-lg shadow-caramel-500/20"
          >
            Partner With Us
          </NavLink>
        </div>
      </div>

      {/* Bottom Info */}
      <div
        ref={infoRef}
        className="relative z-10 border-t border-cream-300/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-cream-300/60 font-sans"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-caramel-400 flex-shrink-0" />
          <span>{PINCOF_INFO.headquarters.full}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-caramel-400 flex-shrink-0" />
          <span>{PINCOF_INFO.partnersEmail}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={PINCOF_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-cream-300 hover:text-caramel-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PINCOF_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-cream-300 hover:text-caramel-400 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
