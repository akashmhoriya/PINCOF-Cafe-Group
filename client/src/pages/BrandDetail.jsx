import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Coffee,
  Globe,
  Compass,
  ChevronRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getBrandBySlug, getMenuItems } from '../services/api';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import Button from '../components/Button';
import MenuCard from '../components/MenuCard';

gsap.registerPlugin(ScrollTrigger);

export const BrandDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(() => {
    return FALLBACK_BRANDS.find((b) => b.slug === slug) || null;
  });
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);

  // Set document title dynamically
  useDocumentTitle(
    brand ? `${brand.name} | PINCOF Café Portfolio` : 'Brand Not Found | PINCOF',
    brand ? brand.description : 'Explore distinctive café concepts by PINCOF.'
  );

  // Fetch brand data and representative menu items
  useEffect(() => {
    let isMounted = true;
    const loadBrandData = async () => {
      try {
        const fetchedBrand = await getBrandBySlug(slug);
        if (isMounted && fetchedBrand) {
          setBrand(fetchedBrand);
        }
      } catch (err) {
        console.warn('Using local fallback for brand:', slug);
        const fallback = FALLBACK_BRANDS.find((b) => b.slug === slug);
        if (isMounted && fallback) {
          setBrand(fallback);
        }
      }

      try {
        const allItems = await getMenuItems();
        if (isMounted && allItems) {
          // Take 3-4 signature items to display as signature offerings
          setMenuItems(allItems.slice(0, 4));
        }
      } catch (err) {
        console.warn('Could not load menu offerings for brand:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBrandData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // GSAP subtle parallax on hero image
  useEffect(() => {
    if (!heroImageRef.current || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(heroImageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [brand]);

  if (!brand && !loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-4">
          Brand Concept Not Found
        </h1>
        <p className="text-cream-300/70 max-w-md mb-8 font-sans">
          The requested portfolio concept does not exist or may have been relocated.
        </p>
        <Button to="/brands" variant="primary">
          Back to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 1. HERO BANNER */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-end pb-16 sm:pb-24 pt-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      >
        {/* Parallax Hero Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src={brand?.heroImage}
            alt={brand?.name}
            className="w-full h-[120%] -top-[10%] relative object-cover brightness-[0.45] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-[#140c08]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140c08]/80 via-transparent to-[#140c08]/40" />
        </div>

        {/* Ambient Top Shadow */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#140c08]/90 to-transparent z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-cream-300/60 mb-6">
            <Link to="/" className="hover:text-caramel-400 transition-colors">
              PINCOF
            </Link>
            <ChevronRight className="w-3 h-3 text-cream-400/40" />
            <Link to="/brands" className="hover:text-caramel-400 transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="w-3 h-3 text-cream-400/40" />
            <span className="text-caramel-400 font-medium">{brand?.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold bg-caramel-500/20 text-caramel-300 border border-caramel-500/30 backdrop-blur-md">
              {brand?.category}
            </span>
            {brand?.franchiseAvailable && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                Franchise Available
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-100 font-light tracking-tight leading-[1.05] max-w-5xl">
            {brand?.name}
          </h1>

          <p className="mt-4 font-serif text-xl sm:text-2xl lg:text-3xl text-caramel-300 font-light italic max-w-3xl">
            "{brand?.tagline}"
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              href="#concept-narrative"
              variant="primary"
              size="lg"
              showArrow={true}
            >
              Explore Concept
            </Button>
            {brand?.franchiseAvailable && (
              <Button
                to={`/franchise?brand=${brand.slug}`}
                variant="outline"
                size="lg"
              >
                Franchise Inquiries
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* 2. CONCEPT ESSENCE & EDITORIAL NARRATIVE */}
      <section
        id="concept-narrative"
        className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Deep Concept Statement */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold block">
              The Concept Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light leading-tight">
              An Architectural Antidote to Modern Pace.
            </h2>
            <p className="text-base sm:text-lg text-cream-200/80 font-sans font-light leading-relaxed">
              {brand?.concept}
            </p>
            <p className="text-sm sm:text-base text-cream-300/70 font-sans font-light leading-relaxed">
              {brand?.description}
            </p>

            {/* Experience Checklist */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-espresso-950/60 border border-espresso-800/80">
                <Coffee className="w-5 h-5 text-caramel-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-sans font-medium text-cream-100">Bespoke Roasting Profiles</h4>
                  <p className="text-xs text-cream-300/60 mt-1 font-sans">
                    Single-origin lots sourced directly and calibrated for this concept.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-espresso-950/60 border border-espresso-800/80">
                <Compass className="w-5 h-5 text-caramel-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-sans font-medium text-cream-100">Curated Acoustics</h4>
                  <p className="text-xs text-cream-300/60 mt-1 font-sans">
                    Soundscapes and natural material acoustics tuned for contemplation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Concept Stats / Metadata Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#160d08] border border-espresso-800/80 shadow-2xl">
            <h3 className="font-serif text-2xl text-cream-100 font-light mb-6">
              Concept Blueprint
            </h3>

            <div className="space-y-4 divide-y divide-espresso-800/60 text-sm font-sans">
              <div className="pt-3 first:pt-0 flex justify-between items-center">
                <span className="text-cream-400/60">Parent Group</span>
                <span className="text-cream-100 font-medium">PINCOF Hospitality</span>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <span className="text-cream-400/60">Category</span>
                <span className="text-caramel-300 font-medium">{brand?.category}</span>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <span className="text-cream-400/60">Active Sanctuaries</span>
                <span className="text-cream-100 font-medium">
                  {brand?.locations ? `${brand.locations.length} Flagships` : '3 Flagships'}
                </span>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <span className="text-cream-400/60">Franchise Program</span>
                <span className="text-emerald-400 font-medium">
                  {brand?.franchiseAvailable ? 'Open for Selection' : 'Waitlist Only'}
                </span>
              </div>
              <div className="pt-3 flex justify-between items-center">
                <span className="text-cream-400/60">Ideal Footprint</span>
                <span className="text-cream-100 font-medium">1,200 — 2,400 sq ft</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-espresso-800/80">
              <Button
                to={`/franchise?brand=${brand?.slug}`}
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Inquire for Franchise Territory
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE EXPERIENCE MENU PREVIEW */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#100906] border-y border-espresso-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
                Tasting Notes &amp; Pairings
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
                Signature Menu Creations.
              </h2>
            </div>
            <Button to="/menu" variant="outline" size="md" showArrow={true}>
              View Full Group Menu
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <MenuCard key={item._id || item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SHOWCASE */}
      {brand?.gallery && brand.gallery.length > 0 && (
        <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              Atmospheric Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
              Inside {brand.name}.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brand.gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[400px] border border-espresso-800/60 group shadow-xl"
              >
                <img
                  src={imgUrl}
                  alt={`${brand.name} atmosphere ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCATIONS LIST */}
      {brand?.locations && brand.locations.length > 0 && (
        <section className="relative py-20 sm:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              Flagship Footprint
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light">
              Where to Experience {brand.name}.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brand.locations.map((loc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-espresso-950/60 border border-espresso-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-caramel-400 text-xs font-sans uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc.city}, {loc.country}</span>
                  </div>
                  <h3 className="font-serif text-xl text-cream-100 mb-2">{loc.name}</h3>
                  <p className="text-xs sm:text-sm text-cream-300/70 font-sans">{loc.address}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-espresso-800/60 flex items-center justify-between text-xs text-caramel-400">
                  <span>Open Daily</span>
                  <span>Flagship Sanctuary</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. FRANCHISE OPPORTUNITY BANNER */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#120a06] to-[#0c0604] border-t border-espresso-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-4 block">
            Franchise &amp; Expansion
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mb-6">
            Operate {brand?.name} In Your Territory.
          </h2>
          <p className="text-sm sm:text-base text-cream-200/80 font-sans font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Become a franchise partner with PINCOF. We provide end-to-end support including site evaluation, custom architectural CAD layouts, roaster agreements, and comprehensive operator training.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to={`/franchise?brand=${brand?.slug}`}
              variant="primary"
              size="lg"
              showArrow={true}
            >
              Apply for {brand?.name} Franchise
            </Button>
            <Button to="/brands" variant="outline" size="lg">
              Explore Other Concepts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandDetail;
