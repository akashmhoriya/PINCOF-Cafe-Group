import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Coffee,
  Cake,
  Croissant,
  UtensilsCrossed,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  MapPin,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getProducts } from '../services/api';
import { FALLBACK_PRODUCTS } from '../data/fallbackProducts';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export const ProductOffering = () => {
  useDocumentTitle(
    'Product Offering | PINCOF Café & Coffee Group',
    'Explore the signature coffee, cakes, pastries, desserts, and café favourites commonly served across the PINCOF portfolio of café brands.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const queryCat = searchParams.get('category');

  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(queryCat || 'All');
  const [loading, setLoading] = useState(true);

  // Sync category when query param changes
  useEffect(() => {
    if (queryCat) {
      setSelectedCategory(queryCat);
    }
  }, [queryCat]);

  const heroRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const categories = [
    'All',
    'Coffee',
    'Cakes',
    'Pastries',
    'Desserts',
    'Café Favourites',
  ];

  // Fetch Products from API with fallback
  useEffect(() => {
    let isMounted = true;
    const fetchProductsData = async () => {
      try {
        const data = await getProducts();
        if (isMounted && data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Using fallback products dataset:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProductsData();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // GSAP Animations on Mount and Category Switch
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (cardsContainerRef.current) {
        gsap.set(cardsContainerRef.current.querySelectorAll('.offering-card-item'), {
          opacity: 1,
          y: 0,
        });
      }
      return;
    }

    // Hero Heading Mask Reveal
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 35 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          y: 0,
          duration: 1.1,
          ease: 'power4.out',
        }
      );
    }

    // Product Cards Cascade on Filter Change
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.offering-card-item');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [selectedCategory, products.length]);

  return (
    <div className="relative w-full min-h-screen pt-28 pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-caramel-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-8 pb-16">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
          <span>PORTFOLIO PRODUCT OFFERING</span>
        </div>

        <div className="overflow-hidden pb-1">
          <h1
            ref={heroHeadingRef}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-100 font-light tracking-tight max-w-5xl mx-auto leading-[1.08]"
          >
            What Our Cafés{' '}
            <span className="italic text-caramel-300 font-serif block sm:inline">
              Serve.
            </span>
          </h1>
        </div>

        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-cream-200/80 font-sans font-light leading-relaxed">
          A shared foundation of coffee, bakery and café favourites — thoughtfully adapted across our growing portfolio of brands.
        </p>
      </section>

      {/* 2. INTRODUCTION STATEMENT — PARENT COMPANY CONTEXT */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#170e09]/80 border border-espresso-800/80 text-center relative overflow-hidden shadow-xl">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-2 block">
            The Shared Foundation
          </span>
          <p className="text-sm sm:text-base text-cream-200/85 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            PINCOF is not a single café. While each brand in our group maintains its unique architectural sanctuary, roasting profile, and service ritual, our portfolio shares a rigorous commitment to direct-trade micro-lot beans, 72-hour cold sourdough lamination, and pure botanical ingredients.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-sans text-cream-400/70 border-t border-espresso-800/60 pt-5">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-caramel-400" />
              Direct-Trade Coffee Above 1,700m
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-caramel-400" />
              Stone Hearth Morning Baking
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-caramel-400" />
              Zero Artificial Essences
            </span>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SWITCHER PILLS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'All') {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: cat });
                }
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-caramel-500 text-espresso-950 font-semibold shadow-[0_0_22px_rgba(200,137,73,0.35)]'
                  : 'bg-espresso-900/60 text-cream-200/70 border border-espresso-700/60 hover:border-caramel-500/50 hover:text-cream-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.slug || product._id}
              className="offering-card-item rounded-3xl overflow-hidden bg-[#160d08] border border-espresso-800/80 shadow-2xl flex flex-col justify-between group hover:border-caramel-500/40 transition-all duration-500"
            >
              <div>
                {/* Visual Imagery */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-espresso-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160d08] via-transparent to-transparent opacity-80" />

                  {/* Category & Signature Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-wider font-semibold bg-espresso-950/80 text-caramel-300 border border-caramel-500/30 backdrop-blur-md">
                      {product.category}
                    </span>
                    {product.signature && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                        Signature
                      </span>
                    )}
                  </div>

                  {product.subCategory && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-[11px] font-sans uppercase tracking-widest text-caramel-400 font-medium">
                        {product.subCategory}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl text-cream-100 font-light mb-3">
                    {product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-cream-300/75 font-sans font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Brand Availability */}
                  <div className="p-3.5 rounded-xl bg-espresso-950/70 border border-espresso-800/60 mb-4">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-caramel-400/90 font-semibold block mb-1">
                      Availability Across Brands
                    </span>
                    <p className="text-xs text-cream-300/80 font-sans">
                      {product.availability}
                    </p>
                    {product.brandNames && product.brandNames.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.brandNames.map((bName, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-espresso-900 border border-espresso-700/60 text-[10px] text-cream-200/90 font-sans"
                          >
                            {bName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tags Footer */}
              {product.tags && product.tags.length > 0 && (
                <div className="px-6 sm:px-8 pb-6 pt-0 flex flex-wrap gap-1.5 border-t border-espresso-800/50 pt-4">
                  {product.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-sans text-cream-400/60 tracking-wider uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT PHILOSOPHY SECTION */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#100906] border-y border-espresso-800/60 mb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              Culinary &amp; Extraction Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
              Our Product Philosophy.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-cream-300/75 font-sans font-light leading-relaxed">
              Every coffee bean pulled, croissant laminated, and cake sliced across our portfolio is governed by three unbending standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-espresso-950/60 border border-espresso-800/80">
              <span className="font-serif text-3xl text-caramel-400/60 block mb-4">01</span>
              <h3 className="font-serif text-2xl text-cream-100 mb-2">Terroir &amp; Direct Trade</h3>
              <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
                We contract directly with micro-lot growers in Yirgacheffe, Huila, and Boquete at guaranteed premium prices, roast on electric fluid-bed drums, and calibrate extraction water down to exact mineral PPM.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-espresso-950/60 border border-espresso-800/80">
              <span className="font-serif text-3xl text-caramel-400/60 block mb-4">02</span>
              <h3 className="font-serif text-2xl text-cream-100 mb-2">72-Hour Hearth Baking</h3>
              <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
                Viennoiserie and artisan loaves undergo 72 hours of cold sourdough fermentation with cultured Normandy butter and stone-ground organic heritage flours, baked fresh at sunrise in stone ovens.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-espresso-950/60 border border-espresso-800/80">
              <span className="font-serif text-3xl text-caramel-400/60 block mb-4">03</span>
              <h3 className="font-serif text-2xl text-cream-100 mb-2">Zero Artificial Additives</h3>
              <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
                We formulate syrups from scratch with Madagascar bourbon vanilla caviar, stone-ground Uji matcha, and wild botanicals—refusing commercial premixes, high-fructose syrups, and synthetic dyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR BRANDS INTEGRATION — WHERE CUSTOMERS EXPERIENCE THESE OFFERINGS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
            Portfolio Concepts
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
            Where These Offerings Come Alive.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-300/75 font-sans font-light leading-relaxed">
            Our products are thoughtfully tailored to distinct atmospheres and customer rituals across our five café brands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FALLBACK_BRANDS.slice(0, 3).map((brand) => (
            <Link
              key={brand.slug}
              to={`/brands/${brand.slug}`}
              className="group p-6 rounded-2xl bg-espresso-950/70 border border-espresso-800/80 hover:border-caramel-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 rounded-xl overflow-hidden mb-5 relative">
                  <img
                    src={brand.heroImage}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-wider bg-espresso-950/80 text-caramel-300 border border-caramel-500/20 backdrop-blur-md">
                    {brand.category}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-cream-100 group-hover:text-caramel-300 transition-colors">
                  {brand.name}
                </h4>
                <p className="text-xs text-caramel-300/80 italic font-serif my-1">
                  "{brand.tagline}"
                </p>
                <p className="text-xs text-cream-300/70 font-sans line-clamp-2 mt-2">
                  {brand.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-espresso-800/60 flex items-center justify-between text-xs text-caramel-400 font-medium">
                <span>View Brand Sanctuaries</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button to="/brands" variant="outline" size="md" showArrow={true}>
            Explore All 5 Portfolio Concepts
          </Button>
        </div>
      </section>

      {/* 7. FRANCHISE CTA */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-3xl p-10 sm:p-16 overflow-hidden bg-gradient-to-br from-[#1b100a] to-[#120a06] border border-caramel-500/20 text-center relative">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              Expansion &amp; Operator Partnerships
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mb-6">
              Bring These Products to Your Market.
            </h2>
            <p className="text-sm sm:text-base text-cream-200/80 font-sans font-light leading-relaxed mb-8">
              We provide franchise partners with direct roasted coffee supply agreements, master pastry formulation specs, equipment packages, and barista training.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/franchise" variant="primary" size="lg" showArrow={true}>
                Explore Franchise Program
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Contact Corporate HQ
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOffering;
