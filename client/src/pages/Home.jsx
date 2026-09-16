import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Coffee,
  Cake,
  Croissant,
  UtensilsCrossed,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PINCOF_INFO } from '../data/pincofInfo';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import { TESTIMONIALS } from '../data/testimonials';
import { getBrands } from '../services/api';

import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import StatCounter from '../components/StatCounter';
import Gallery from '../components/Gallery';
import TestimonialCard from '../components/TestimonialCard';

import { createHeroEntranceSequence, createHeroParallaxDepth } from '../animations/heroAnimations';
import { createScrollSkew } from '../animations/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_CATEGORIES = [
  {
    name: 'Coffee',
    slug: 'coffee',
    icon: Coffee,
    tagline: 'Single-Origin Roasts & Espresso Labs',
    description:
      'Direct-trade beans above 1,750m, fluid-bed roasted and extracted on ceramic slow bars and flush Modbar undercounter systems.',
    items: ['Gesha Pour-Over', 'Single-Origin Double Espresso', 'Velvet Flat White', 'Kyoto Cold Drip'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    availability: 'Available across all 5 portfolio brands',
  },
  {
    name: 'Cakes',
    slug: 'cakes',
    icon: Cake,
    tagline: 'Artisanal Slice & Celebration Cakes',
    description:
      'Basque burnt cheesecakes, Valrhona dark chocolate tortes, and Sicilian pistachio blossom tarts baked fresh daily in small batches.',
    items: ['Basque Burnt Cheesecake', 'Valrhona Torte', 'Pistachio Orange Tart', 'Elderflower Citrus Cake'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    availability: 'Featured at Hearth, Atelier & Solstice',
  },
  {
    name: 'Pastries',
    slug: 'pastries',
    icon: Croissant,
    tagline: '72-Hour Laminated French Viennoiserie',
    description:
      'Slow cold-fermented sourdough lamination using AOP Charentes-Poitou butter for unmatched shatteringly crisp honeycomb crumb.',
    items: ['Artisan Butter Croissant', 'Pain au Chocolat', 'Cardamom Kouign-Amann', 'Tahitian Vanilla Danish'],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85',
    availability: 'Morning bake across all PINCOF bakeries',
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    icon: Sparkles,
    tagline: 'Plated Confections & Sweet Cups',
    description:
      'Decadent single-origin brownies, espresso crema tiramisu cups, and warm botanical tea tarts finished with sea salt.',
    items: ['Gianduja Hazelnut Brownie', 'Espresso Crema Tiramisu', 'Caramel Sea Salt Sable', 'Madagascar Panna Cotta'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
    availability: 'Served all-day across dining rooms',
  },
  {
    name: 'Café Favourites',
    slug: 'cafe-favourites',
    icon: UtensilsCrossed,
    tagline: 'Gourmet Melts, Tartines & Bowls',
    description:
      'Stone-milled country sourdough melts, wild forest mushroom tartines, and botanical breakfast bowls crafted with farm-to-table produce.',
    items: ['Truffle Comté Toastie', 'Forest Mushroom Tartine', 'Green Goddess Bowl', 'Smoked Salmon Brioche'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85',
    availability: 'Breakfast & lunch across all concepts',
  },
];

export const Home = () => {
  useDocumentTitle(
    'PINCOF | Café & Coffee Brands Group',
    'Building Brands. Brewing Experiences. PINCOF is the parent hospitality group developing, operating, and growing distinctive café concepts globally.'
  );

  const [brands, setBrands] = useState(FALLBACK_BRANDS);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroMidgroundRef = useRef(null);
  const heroForegroundRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const introSectionRef = useRef(null);
  const introImageWrapperRef = useRef(null);
  const introImageRef = useRef(null);
  const introTextRef = useRef(null);

  const philosophyRef = useRef(null);

  // Section: Signature Brand Offering Refs
  const brandOfferingSectionRef = useRef(null);
  const brandOfferingTrackRef = useRef(null);
  const brandProgressBarRef = useRef(null);

  // Section: Product Offering Refs
  const productOfferingSectionRef = useRef(null);
  const productOfferingHeadingRef = useRef(null);
  const productOfferingCardsRef = useRef(null);

  // Section: Scale Built on Integrity Refs
  const integritySectionRef = useRef(null);
  const integrityHeadingRef = useRef(null);
  const integrityTextRef = useRef(null);
  const integrityImageWrapperRef = useRef(null);
  const integrityImageRef = useRef(null);
  const integrityPillarsRef = useRef(null);
  const integrityStatsRef = useRef(null);

  const finalCtaRef = useRef(null);

  // Fetch Brands from API with resilient fallback
  useEffect(() => {
    let isMounted = true;
    const loadBrandsData = async () => {
      try {
        const fetched = await getBrands().catch(() => FALLBACK_BRANDS);
        if (isMounted && fetched && fetched.length > 0) {
          setBrands(fetched);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      } catch (err) {
        console.warn('Brands data loading error:', err);
      }
    };
    loadBrandsData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Master GSAP Animations Setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([heroBgRef.current, heroSubRef.current], { opacity: 1, scale: 1, y: 0 });
        gsap.set(heroTitleRef.current?.querySelectorAll('.hero-word, .hero-line'), { opacity: 1, y: 0 });
        gsap.set(heroCtaRef.current?.children, { opacity: 1, y: 0 });
        if (introImageWrapperRef.current) {
          gsap.set(introImageWrapperRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        }
        if (introTextRef.current) {
          gsap.set(introTextRef.current.children, { opacity: 1, y: 0 });
        }
        if (philosophyRef.current) {
          gsap.set(philosophyRef.current.querySelectorAll('.philosophy-line'), { opacity: 1, y: 0 });
        }
        if (integrityHeadingRef.current) {
          gsap.set(integrityHeadingRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0 });
        }
        if (integrityImageWrapperRef.current) {
          gsap.set(integrityImageWrapperRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        }
        gsap.set('.integrity-pillar-card', { opacity: 1, x: 0 });
        if (productOfferingSectionRef.current) {
          gsap.set(productOfferingSectionRef.current.querySelectorAll('.product-offering-card'), { opacity: 1, y: 0 });
        }
        return;
      }

      // 1. Hero Entrance Sequence & Parallax
      createHeroEntranceSequence({
        heroBgRef: heroBgRef.current,
        heroMidgroundRef: heroMidgroundRef.current,
        heroForegroundRef: heroForegroundRef.current,
        heroTitleRef: heroTitleRef.current,
        heroSubRef: heroSubRef.current,
        heroCtaRef: heroCtaRef.current,
        scrollIndicatorRef: scrollIndicatorRef.current,
      });

      createHeroParallaxDepth({
        heroSection: heroRef.current,
        bgLayer: heroBgRef.current,
        midLayer: heroMidgroundRef.current,
        fgLayer: heroForegroundRef.current,
        titleLayer: heroTitleRef.current,
      });

      // 2. Editorial Split Intro Mask Reveal
      if (introImageWrapperRef.current && introImageRef.current) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        introTl
          .fromTo(
            introImageWrapperRef.current,
            { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.5,
              ease: 'power4.inOut',
            }
          )
          .fromTo(
            introImageRef.current,
            { scale: 1.28 },
            { scale: 1, duration: 1.5, ease: 'power3.out' },
            0
          )
          .fromTo(
            introTextRef.current?.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: 'power3.out' },
            '-=0.9'
          );
      }

      // 3. Responsive GSAP Architecture (Desktop vs Tablet/Mobile)
      ScrollTrigger.matchMedia({
        // DESKTOP (>= 1024px)
        '(min-width: 1024px)': function () {
          // Philosophy Pinned Typography Scrub
          if (philosophyRef.current) {
            const lines = philosophyRef.current.querySelectorAll('.philosophy-line');
            if (lines.length >= 4) {
              const philTl = gsap.timeline({
                scrollTrigger: {
                  trigger: philosophyRef.current,
                  pin: true,
                  scrub: 1.2,
                  start: 'top top',
                  end: '+=160%',
                  invalidateOnRefresh: true,
                },
              });

              philTl
                .fromTo(
                  lines[0],
                  { x: -100, opacity: 0.1, letterSpacing: '0.08em' },
                  { x: 0, opacity: 1, letterSpacing: '-0.02em', duration: 1.2, ease: 'power3.out' }
                )
                .fromTo(
                  lines[1],
                  { x: 100, opacity: 0.1 },
                  { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
                  '-=0.7'
                )
                .fromTo(
                  lines[2],
                  { scale: 0.8, opacity: 0.1, filter: 'blur(8px)' },
                  { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
                  '-=0.7'
                )
                .fromTo(
                  lines[3],
                  { y: 50, opacity: 0.1, clipPath: 'inset(100% 0% 0% 0%)' },
                  { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' },
                  '-=0.7'
                )
                .to(
                  philosophyRef.current,
                  { backgroundColor: '#1c100a', duration: 2, ease: 'none' },
                  0
                );
            }
          }

          // Section 5: "Scale Built on Integrity" Desktop Choreography
          if (integritySectionRef.current) {
            // Masked Heading Reveal
            if (integrityHeadingRef.current) {
              gsap.fromTo(
                integrityHeadingRef.current,
                { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 35 },
                {
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  y: 0,
                  duration: 1.2,
                  ease: 'power4.out',
                  scrollTrigger: {
                    trigger: integrityHeadingRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }

            // Supporting statement slide
            if (integrityTextRef.current) {
              gsap.fromTo(
                integrityTextRef.current,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: integrityTextRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }

            // Image Frame Mask Reveal & Parallax
            if (integrityImageWrapperRef.current && integrityImageRef.current) {
              gsap.fromTo(
                integrityImageWrapperRef.current,
                { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
                {
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  duration: 1.4,
                  ease: 'power3.inOut',
                  scrollTrigger: {
                    trigger: integrityImageWrapperRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                  },
                }
              );

              gsap.fromTo(
                integrityImageRef.current,
                { scale: 1.2, yPercent: -8 },
                {
                  scale: 1,
                  yPercent: 8,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: integrityImageWrapperRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.3,
                  },
                }
              );
            }

            // Governance Pillars Stagger
            const pillarCards = integritySectionRef.current.querySelectorAll('.integrity-pillar-card');
            if (pillarCards.length > 0) {
              gsap.fromTo(
                pillarCards,
                { opacity: 0, x: 40 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  stagger: 0.16,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: integrityPillarsRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }
          }

          // Section 6: "Signature Brand Offering" Desktop Pinned Horizontal Showcase
          if (brandOfferingSectionRef.current && brandOfferingTrackRef.current) {
            const scrollDistance =
              brandOfferingTrackRef.current.scrollWidth - window.innerWidth + 140;

            const brandTl = gsap.timeline({
              scrollTrigger: {
                trigger: brandOfferingSectionRef.current,
                pin: true,
                scrub: 1.1,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (brandProgressBarRef.current) {
                    brandProgressBarRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
                  }
                },
              },
            });

            brandTl.to(brandOfferingTrackRef.current, {
              x: () => -scrollDistance,
              ease: 'none',
            });

            // Card zoom subtle parallax during glide
            const cardImages = brandOfferingTrackRef.current.querySelectorAll('.brand-card-img');
            cardImages.forEach((img) => {
              gsap.fromTo(
                img,
                { scale: 1.12 },
                {
                  scale: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: brandOfferingSectionRef.current,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    scrub: 1.4,
                  },
                }
              );
            });
          }

          // Section: "Product Offering" Desktop Choreography
          if (productOfferingSectionRef.current) {
            if (productOfferingHeadingRef.current) {
              gsap.fromTo(
                productOfferingHeadingRef.current,
                { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 35 },
                {
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  y: 0,
                  duration: 1.1,
                  ease: 'power4.out',
                  scrollTrigger: {
                    trigger: productOfferingHeadingRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }

            const offeringCards = productOfferingSectionRef.current.querySelectorAll('.product-offering-card');
            if (offeringCards.length > 0) {
              gsap.fromTo(
                offeringCards,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  stagger: 0.12,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: productOfferingCardsRef.current || productOfferingSectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }
          }
        },

        // TABLET & MOBILE (< 1024px)
        '(max-width: 1023px)': function () {
          // Philosophy Mobile Fade-ins
          if (philosophyRef.current) {
            const lines = philosophyRef.current.querySelectorAll('.philosophy-line');
            lines.forEach((line) => {
              gsap.fromTo(
                line,
                { opacity: 0.2, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: line,
                    start: 'top 85%',
                    end: 'top 55%',
                    scrub: 1,
                  },
                }
              );
            });
          }

          // Scale Built on Integrity Mobile Entrance
          if (integritySectionRef.current) {
            gsap.fromTo(
              [integrityHeadingRef.current, integrityTextRef.current],
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: integritySectionRef.current,
                  start: 'top 85%',
                },
              }
            );

            const cards = integritySectionRef.current.querySelectorAll('.integrity-pillar-card');
            gsap.fromTo(
              cards,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: integrityPillarsRef.current,
                  start: 'top 85%',
                },
              }
            );
          }

          // Signature Brand Offering Mobile Stagger (No pinning trap!)
          if (brandOfferingSectionRef.current) {
            const brandCards = brandOfferingSectionRef.current.querySelectorAll('.brand-portfolio-card');
            gsap.fromTo(
              brandCards,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: brandOfferingSectionRef.current,
                  start: 'top 80%',
                },
              }
            );
          }

          // Product Offering Mobile Stagger
          if (productOfferingSectionRef.current) {
            const offeringCards = productOfferingSectionRef.current.querySelectorAll('.product-offering-card');
            gsap.fromTo(
              offeringCards,
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: productOfferingSectionRef.current,
                  start: 'top 85%',
                },
              }
            );
          }
        },
      });

      // Subtle Velocity Skew on Portfolio Brand Cards
      createScrollSkew('.brand-portfolio-card', { maxSkew: 2.5 });

      // Final CTA Background Parallax
      if (finalCtaRef.current) {
        const bg = finalCtaRef.current.querySelector('.cta-bg');
        if (bg) {
          gsap.fromTo(
            bg,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: finalCtaRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [brands.length]);

  // Testimonial Controls
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden"
      >
        {/* Layer 1: Background Image with Parallax & Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroBgRef}
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85"
            alt="PINCOF Hospitality Architecture"
            className="w-full h-full object-cover brightness-[0.34] contrast-[1.1] scale-110 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-[#140c08]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140c08]/90 via-transparent to-[#140c08]/90" />
        </div>

        {/* Layer 2: Midground Artisanal Coffee Element */}
        <div
          ref={heroMidgroundRef}
          className="absolute right-[5%] sm:right-[10%] bottom-[12%] sm:bottom-[16%] w-44 sm:w-60 md:w-72 h-44 sm:h-60 md:h-72 rounded-full overflow-hidden pointer-events-none opacity-60 md:opacity-80 shadow-[0_0_90px_rgba(200,137,73,0.35)] border border-caramel-500/30 will-change-transform z-[5]"
        >
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
            alt="Direct Trade Coffee extraction"
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-transparent" />
        </div>

        {/* Layer 3: Foreground Atmospheric Particles */}
        <div
          ref={heroForegroundRef}
          className="absolute inset-0 pointer-events-none z-[6] overflow-hidden opacity-40 will-change-transform"
        >
          <div className="absolute top-1/4 left-[8%] w-3 h-3 rounded-full bg-caramel-400/40 blur-[1px] animate-pulse" />
          <div className="absolute top-2/3 left-[15%] w-2 h-2 rounded-full bg-amber-200/30 blur-[1px]" />
          <div className="absolute top-1/3 right-[12%] w-4 h-4 rounded-full bg-caramel-500/30 blur-[2px]" />
          <div className="absolute bottom-1/4 right-[25%] w-2.5 h-2.5 rounded-full bg-caramel-300/40 blur-[1px]" />
        </div>

        {/* Ambient warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-caramel-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
            <span>PINCOF &bull; Café &amp; Coffee Brands Group</span>
          </div>

          {/* Animated Line-by-Line Heading with Word Spans */}
          <h1
            ref={heroTitleRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight leading-[1.08] select-none"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block mr-3 sm:mr-4">Building</span>
              <span className="hero-word inline-block">Brands.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block italic text-caramel-300 font-serif mr-3 sm:mr-4">
                Brewing
              </span>
              <span className="hero-word inline-block italic text-caramel-300 font-serif">
                Experiences.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={heroSubRef}
            className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-cream-200/80 font-sans font-light leading-relaxed tracking-wide"
          >
            {PINCOF_INFO.subheading}
          </p>

          {/* Action CTAs */}
          <div
            ref={heroCtaRef}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <Button to="/brands" variant="primary" size="lg" showArrow={true}>
              Explore Portfolio
            </Button>
            <Button to="/franchise" variant="outline" size="lg">
              Partner With Us
            </Button>
          </div>

          {/* Scroll Down Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="mt-16 flex flex-col items-center gap-2 text-cream-400/50 hover:text-caramel-400 transition-colors animate-bounce cursor-pointer"
            onClick={() => {
              introSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] uppercase font-sans tracking-[0.25em]">
              Scroll To Experience
            </span>
            <ArrowDown className="w-4 h-4 text-caramel-400" />
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION — EDITORIAL SPLIT SECTION */}
      <section
        ref={introSectionRef}
        className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Mask-Revealed Photograph */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={introImageWrapperRef}
              className="relative w-full h-[450px] sm:h-[550px] rounded-2xl overflow-hidden shadow-2xl border border-cream-300/10 cursor-view group"
            >
              <img
                ref={introImageRef}
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="PINCOF Hospitality Baristas & Roasting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-cream-200">
                <span className="tracking-widest uppercase text-caramel-400">PINCOF Group</span>
                <span className="opacity-80">5 Concepts &bull; 24 Flagships</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography & Story */}
          <div
            ref={introTextRef}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start"
          >
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-3">
              The PINCOF Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-100 font-light leading-[1.15] mb-6">
              Curating The Future Of <br />
              <span className="italic text-caramel-300">Café Culture.</span>
            </h2>
            <p className="text-base sm:text-lg text-cream-300/80 font-sans leading-relaxed mb-6 font-light">
              PINCOF is not a single café. We are a global hospitality group that develops, operates, and scales distinctive coffee brands—each with its own architectural language, roasting philosophy, and guest experience.
            </p>
            <p className="text-sm sm:text-base text-cream-300/60 font-sans leading-relaxed mb-8">
              From slow pour-over sanctuaries to high-precision espresso labs and European bakery hearths, our portfolio meets discerning coffee lovers at every moment of their daily ritual.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button to="/about" variant="outline" size="md" showArrow={true}>
                Discover Our Group Story
              </Button>
              <Button to="/brands" variant="ghost" size="md">
                Explore All Concepts &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FOUR CORPORATE PILLARS */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeading
          badge="The PINCOF Standard"
          title="Our Four Corporate Pillars."
          subtitle="How our parent group conceives, operates, and guarantees excellence across every hospitality concept."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PINCOF_INFO.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#160d08] border border-espresso-800/80 hover:border-caramel-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl text-caramel-400/50 block mb-4">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl text-cream-100 mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs font-sans uppercase tracking-widest text-caramel-300/80 font-medium block mb-4">
                  {pillar.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PINNED PHILOSOPHY TYPOGRAPHY SECTION */}
      <section
        ref={philosophyRef}
        className="relative min-h-screen py-32 sm:py-44 px-6 sm:px-8 lg:px-12 bg-[#0e0805] text-center border-t border-espresso-800/80 overflow-hidden flex flex-col justify-center items-center"
      >
        {/* Ambient radial glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-caramel-600/10 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col space-y-8 sm:space-y-12 select-none">
          <span className="text-xs uppercase font-sans tracking-[0.35em] text-caramel-400 font-semibold">
            The PINCOF Philosophy
          </span>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight will-change-transform">
            Coffee.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-caramel-300 italic tracking-tight will-change-transform">
            Culture.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight will-change-transform">
            Community.
          </div>
          <div className="philosophy-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-caramel-400 tracking-tight will-change-transform">
            Growth.
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE BRAND OFFERING — THE BRAND PORTFOLIO SHOWCASE */}
      <section
        ref={brandOfferingSectionRef}
        className="relative py-28 sm:py-36 bg-[#0c0604] border-y border-espresso-800/80 overflow-hidden"
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
                SIGNATURE BRAND OFFERING
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-tight leading-[1.12]">
                Distinctive Café Brands.{' '}
                <span className="italic text-caramel-300 font-serif block sm:inline">
                  One Shared Vision.
                </span>
              </h2>
              <p className="mt-5 text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed">
                PINCOF develops distinctive coffee and café concepts designed around strong identities, memorable experiences and scalable operating models.
              </p>
            </div>

            {/* Header Actions & Desktop Progress Bar */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 flex-shrink-0">
              <Button to="/brands" variant="outline" size="md" showArrow={true}>
                View All Concepts
              </Button>

              {/* Desktop Scrub Progress Bar */}
              <div className="hidden lg:flex items-center gap-3 text-xs font-sans text-cream-400/60 mt-2">
                <span>01</span>
                <div className="w-28 h-1 bg-espresso-800 rounded-full overflow-hidden">
                  <div
                    ref={brandProgressBarRef}
                    className="h-full bg-caramel-400 rounded-full w-0 transition-all duration-75"
                  />
                </div>
                <span>05</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Portfolio Track: Pinned on Desktop, Smooth Touch-Snap on Mobile */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={brandOfferingTrackRef}
            className="flex flex-row space-x-6 sm:space-x-8 px-6 sm:px-12 lg:px-16 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none will-change-transform pb-6 lg:pb-0"
          >
            {brands.map((brand, bIdx) => (
              <div
                key={brand.slug || bIdx}
                className="brand-portfolio-card flex-shrink-0 w-[85vw] sm:w-[460px] lg:w-[500px] h-[520px] sm:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-espresso-800/80 bg-[#160d08] relative group flex flex-col justify-end p-7 sm:p-9 snap-center transition-all duration-500 hover:border-caramel-500/40"
              >
                {/* Hero Image */}
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="brand-card-img absolute inset-0 w-full h-full object-cover brightness-[0.65] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-[#120a06]/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold bg-espresso-950/80 text-caramel-300 border border-caramel-500/30 backdrop-blur-md">
                    {brand.category}
                  </span>
                  <span className="text-xs font-sans text-cream-200/80 bg-espresso-950/80 px-3 py-1 rounded-full border border-espresso-700/50 backdrop-blur-md">
                    0{bIdx + 1}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10">
                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-caramel-400/90 font-medium block mb-1">
                    Concept 0{bIdx + 1}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-cream-100 font-light mb-1">
                    {brand.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans italic text-caramel-300/90 mb-3">
                    "{brand.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-cream-300/80 font-sans line-clamp-2 mb-6 font-light leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Metadata & Direct Link CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-cream-300/15">
                    <span className="text-xs text-cream-400/70 font-sans">
                      {brand.locations ? `${brand.locations.length} Flagships` : 'Global Expansion'}
                    </span>

                    <Link
                      to={`/brands/${brand.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-caramel-400 hover:text-caramel-300 transition-colors font-medium group/link"
                    >
                      <span>Explore Brand</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRODUCT OFFERING — WHAT OUR CAFÉS SERVE */}
      <section
        ref={productOfferingSectionRef}
        className="relative py-28 sm:py-36 bg-[#0e0705] border-b border-espresso-800/80 overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-caramel-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-4 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
                <span>PRODUCT OFFERING &bull; WHAT OUR CAFÉS SERVE</span>
              </div>
              <div className="overflow-hidden pb-1">
                <h2
                  ref={productOfferingHeadingRef}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-tight leading-[1.12]"
                >
                  Signature Offerings <br />
                  <span className="italic text-caramel-300 font-serif">
                    Across Our Cafés.
                  </span>
                </h2>
              </div>
              <p className="mt-5 text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed">
                From carefully crafted coffee to cakes, pastries and indulgent café favourites, our brands share a signature offering designed around quality, consistency and memorable everyday experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start lg:items-end gap-4 flex-shrink-0">
              <Button to="/offerings" variant="primary" size="md" showArrow={true}>
                Explore Product Offering
              </Button>
            </div>
          </div>

          {/* 5 Category Showcase Cards Grid */}
          <div
            ref={productOfferingCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16"
          >
            {PRODUCT_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.slug}
                  className="product-offering-card group relative rounded-3xl overflow-hidden bg-[#160d08] border border-espresso-800/80 hover:border-caramel-500/40 transition-all duration-500 flex flex-col justify-between shadow-2xl"
                >
                  {/* Image with Dark Gradient */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-espresso-950">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="product-card-img w-full h-full object-cover brightness-[0.75] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160d08] via-[#160d08]/50 to-transparent" />

                    {/* Category Icon Badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso-950/85 border border-caramel-500/30 text-caramel-300 backdrop-blur-md text-xs font-sans uppercase tracking-wider font-semibold">
                      <Icon className="w-3.5 h-3.5 text-caramel-400" />
                      <span>{cat.name}</span>
                    </div>

                    {/* Counter */}
                    <span className="absolute top-4 right-4 z-10 text-xs font-sans text-cream-300/70 bg-espresso-950/80 px-2.5 py-1 rounded-full border border-espresso-700/50 backdrop-blur-md">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-cream-100 font-light mb-1.5 group-hover:text-caramel-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans italic text-caramel-300/85 mb-3">
                        {cat.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-cream-300/75 font-sans font-light leading-relaxed mb-5">
                        {cat.description}
                      </p>

                      {/* Sample Highlights Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {cat.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-espresso-900/90 text-cream-200/80 border border-espresso-700/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info & Link */}
                    <div className="pt-4 border-t border-cream-300/10 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-cream-400/70">
                        {cat.availability}
                      </span>
                      <Link
                        to={`/offerings?category=${encodeURIComponent(cat.name)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-caramel-400 hover:text-caramel-300 transition-colors font-medium group/link"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Shared Foundation Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#170e09] via-[#1c110b] to-[#170e09] border border-espresso-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold block mb-2">
                A Shared Standard Across 5 Concepts
              </span>
              <p className="text-sm sm:text-base text-cream-200/90 font-serif font-light leading-relaxed">
                "A shared foundation of coffee, bakery and café favourites — thoughtfully adapted across our growing portfolio of brands."
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Button to="/offerings" variant="primary" size="md" showArrow={true}>
                View All 20 Portfolio Products
              </Button>
              <Button to="/brands" variant="outline" size="md">
                Explore Café Brands
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCALE BUILT ON INTEGRITY — CORPORATE GOVERNANCE & PHILOSOPHY */}
      <section
        ref={integritySectionRef}
        className="relative py-28 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-caramel-500/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Editorial Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-5 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-caramel-400" />
            <span>Corporate Governance &amp; Expansion</span>
          </div>

          <div className="overflow-hidden pb-1">
            <h2
              ref={integrityHeadingRef}
              className="integrity-heading font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-tight leading-[1.12]"
            >
              Scale Built On{' '}
              <span className="italic text-caramel-300 font-serif">Integrity.</span>
            </h2>
          </div>

          <p
            ref={integrityTextRef}
            className="integrity-text mt-6 text-base sm:text-lg md:text-xl text-cream-200/80 font-sans font-light leading-relaxed max-w-3xl"
          >
            Disciplined operations, direct-trade transparency, and long-term operator partnerships—growing our global footprint without compromising the soul, origin terroir, or architectural intimacy of our concepts.
          </p>
        </div>

        {/* Asymmetric Editorial Composition: Image Showcase + Governance Tenets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Layered Editorial Visual Frame */}
          <div className="lg:col-span-6 relative">
            <div
              ref={integrityImageWrapperRef}
              className="integrity-img-frame relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-cream-300/10 shadow-2xl bg-espresso-950"
            >
              <img
                ref={integrityImageRef}
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85"
                alt="PINCOF Central Quality Roastery & Design Studio"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-transparent to-transparent" />

              {/* Floating Provenance Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-espresso-950/85 border border-caramel-500/20 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.25em] text-caramel-400 font-sans font-semibold block mb-1">
                  Parent Company Standard
                </span>
                <p className="text-xs sm:text-sm text-cream-100 font-serif">
                  Zero-emission fluid bed roasting &bull; Direct farm lot contracts across 8 origins
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Governance Tenets */}
          <div ref={integrityPillarsRef} className="lg:col-span-6 space-y-5">
            <div className="integrity-pillar-card p-6 sm:p-7 rounded-2xl bg-[#160e09]/80 border border-espresso-800/70 hover:border-caramel-500/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream-100 font-light mb-1">
                    Operational Discipline
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/75 font-sans leading-relaxed">
                    Standardized extraction metrics down to tenths of TDS, turnkey architectural CAD blueprints, and centralized barista academies ensure identical cup and service excellence across all global flagships.
                  </p>
                </div>
              </div>
            </div>

            <div className="integrity-pillar-card p-6 sm:p-7 rounded-2xl bg-[#160e09]/80 border border-espresso-800/70 hover:border-caramel-500/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream-100 font-light mb-1">
                    Sustainable Franchise Expansion
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/75 font-sans leading-relaxed">
                    We grant non-cannibalizing, protected metropolitan radii and maintain an industry-leading 98% partner retention rate by prioritizing operator unit economics over rapid, careless proliferation.
                  </p>
                </div>
              </div>
            </div>

            <div className="integrity-pillar-card p-6 sm:p-7 rounded-2xl bg-[#160e09]/80 border border-espresso-800/70 hover:border-caramel-500/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream-100 font-light mb-1">
                    Preserving Concept Identity
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/75 font-sans leading-relaxed">
                    Each concept preserves its bespoke architectural language, calibrated acoustics, and signature ritual—ensuring that growth amplifies authenticity rather than diluting it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Corporate Metrics (StatCounters) */}
        <div
          ref={integrityStatsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-espresso-800/60"
        >
          {PINCOF_INFO.stats.map((stat, idx) => (
            <StatCounter
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals || 0}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <SectionHeading
            align="left"
            badge="Guest &amp; Operator Impressions"
            title="Words Across Our Sanctuaries."
            subtitle="Reflections from guests, architectural critics, and franchise operators across PINCOF locations worldwide."
          />
          {/* Navigation buttons */}
          <div className="flex items-center space-x-3 self-start sm:self-end">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-3 rounded-full border border-cream-300/20 text-cream-200 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-3 rounded-full border border-cream-300/20 text-cream-200 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Active Testimonial Card */}
        <div className="transition-opacity duration-500">
          <TestimonialCard testimonial={TESTIMONIALS[currentTestimonial]} />
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentTestimonial ? 'w-8 bg-caramel-400' : 'w-2 bg-espresso-700'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 9. PHOTO GALLERY */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <SectionHeading
          badge="Atmosphere"
          title="Light, Space &amp; Craft."
          subtitle="Visual impressions across our roasteries, espresso bars, and conservatory spaces."
          className="mb-16"
        />
        <Gallery />
      </section>

      {/* 10. FINAL CTA — CINEMATIC FRANCHISE BANNER */}
      <section
        ref={finalCtaRef}
        className="relative py-32 sm:py-40 px-6 sm:px-8 lg:px-12 overflow-hidden flex items-center justify-center text-center"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=85"
            alt="PINCOF Hospitality Architecture"
            className="cta-bg w-full h-[130%] -top-[15%] relative object-cover brightness-[0.3] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-[#140c08]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-4 px-4 py-1 rounded-full bg-caramel-500/10 border border-caramel-500/20">
            Franchise &amp; Operator Partnerships
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-cream-100 font-light leading-tight mb-6">
            Grow With PINCOF. <br />
            <span className="italic text-caramel-300">Build The Next Iconic Café.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed mb-8 max-w-xl">
            We partner with passionate operators, property developers, and hospitality entrepreneurs to introduce our portfolio concepts to high-character global destinations.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Button
              to="/franchise"
              variant="primary"
              size="lg"
              showArrow={true}
            >
              Explore Franchise Program
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Corporate HQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
