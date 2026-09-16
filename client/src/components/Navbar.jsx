import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileMenu from './MobileMenu';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksNavRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based GSAP interpolation
      gsap.to(navRef.current, {
        paddingTop: '0.85rem',
        paddingBottom: '0.85rem',
        backgroundColor: 'rgba(18, 11, 7, 0.94)',
        borderColor: 'rgba(200, 137, 73, 0.2)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          start: 'top -40',
          end: 'top -80',
          toggleActions: 'play none none reverse',
        },
      });

      // Logo scale interpolation
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 0.94,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            start: 'top -40',
            end: 'top -80',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Brands', path: '/brands' },
    { name: 'Product Offering', path: '/offerings' },
    { name: 'About Us', path: '/about' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-6 bg-transparent border-b border-transparent backdrop-blur-md transition-all will-change-[padding,background-color]"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* PINCOF Brand Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center gap-2.5 group select-none outline-none origin-left will-change-transform"
            aria-label="PINCOF Parent Company Home"
          >
            <div className="w-8 h-8 rounded-full border border-caramel-400/40 bg-caramel-500/10 flex items-center justify-center transition-all duration-300 group-hover:border-caramel-400 group-hover:bg-caramel-500/25">
              <Layers className="w-4 h-4 text-caramel-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] font-light text-cream-100 group-hover:text-caramel-300 transition-colors">
                PINCOF
              </span>
              <span className="text-[9px] tracking-[0.28em] text-caramel-400/85 uppercase font-sans -mt-1 font-medium">
                Café &amp; Coffee Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={linksNavRef}
            className="hidden md:flex items-center space-x-8"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="relative py-1 text-xs font-sans tracking-[0.2em] uppercase transition-colors duration-300 text-cream-200 hover:text-white group"
                >
                  <span className={isActive ? 'text-caramel-400 font-semibold' : ''}>
                    {link.name}
                  </span>
                  {/* Animated underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-caramel-400 transition-all duration-300 ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Button
                to="/franchise"
                variant="primary"
                size="sm"
                showArrow={true}
                className="font-medium tracking-widest text-xs uppercase"
              >
                Partner With Us
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="md:hidden p-2.5 rounded-full bg-espresso-800/80 border border-cream-300/20 text-cream-200 hover:text-caramel-400 hover:border-caramel-400 transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
