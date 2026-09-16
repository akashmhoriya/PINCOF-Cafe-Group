import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin, CheckCircle2, Coffee, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getBrands } from '../services/api';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import { PINCOF_INFO } from '../data/pincofInfo';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

export const Brands = () => {
  useDocumentTitle(
    'Our Brands | PINCOF Café & Coffee Group',
    'Explore the PINCOF portfolio of distinctive café and coffee concepts operating across premier global cities.'
  );

  const [brands, setBrands] = useState(FALLBACK_BRANDS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const pageRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        if (isMounted && data && data.length > 0) {
          setBrands(data);
        }
      } catch (err) {
        console.warn('Using fallback brands dataset:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    'All',
    'Specialty Coffee',
    'Modern Café',
    'Contemporary Coffee House',
    'Coffee & Bakery',
    'Neighborhood Café',
  ];

  const filteredBrands =
    selectedCategory === 'All'
      ? brands
      : brands.filter((brand) => brand.category === selectedCategory);

  // GSAP Entrance animation on category change or brand load
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = cardsContainerRef.current.querySelectorAll('.brand-card-item');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }
    );
  }, [selectedCategory, brands]);

  return (
    <div ref={pageRef} className="relative w-full min-h-screen pt-28 pb-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-caramel-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-8 pb-16">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
          <span>The PINCOF Portfolio</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-cream-100 font-light tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Distinctive Concepts.{' '}
          <span className="italic text-caramel-300 font-serif block sm:inline">
            Curated Experiences.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-cream-200/70 font-sans font-light leading-relaxed">
          PINCOF develops and scales high-character café brands. Each concept is engineered with bespoke architectural identity, uncompromised coffee science, and warm hospitality.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-caramel-500 text-espresso-950 font-semibold shadow-[0_0_20px_rgba(200,137,73,0.35)]'
                  : 'bg-espresso-900/60 text-cream-200/70 border border-espresso-700/60 hover:border-caramel-500/50 hover:text-cream-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands List Container */}
      <div ref={cardsContainerRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {filteredBrands.map((brand, idx) => (
          <div
            key={brand.slug || brand._id}
            className="brand-card-item relative rounded-3xl overflow-hidden bg-[#180e09]/90 border border-espresso-800/80 shadow-2xl transition-all duration-500 hover:border-caramel-500/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              {/* Brand Visual Imagery */}
              <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] overflow-hidden group">
                <img
                  src={brand.heroImage}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180e09] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#180e09] hidden lg:block" />

                {/* Badges on Image */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-espresso-950/80 text-caramel-300 border border-caramel-500/30 backdrop-blur-md">
                    {brand.category}
                  </span>
                  {brand.franchiseAvailable && (
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      Franchise Available
                    </span>
                  )}
                </div>

                {/* Concept Logo Stamp */}
                <div className="absolute bottom-6 left-6 z-10 hidden sm:block">
                  <div className="text-2xl font-serif tracking-[0.2em] uppercase text-cream-100/90 drop-shadow-md">
                    {brand.logo || brand.name}
                  </div>
                </div>
              </div>

              {/* Brand Narrative & Details */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400/90 font-medium">
                      Concept 0{idx + 1}
                    </span>
                    <span className="text-xs font-sans text-cream-300/50">
                      {brand.locations ? `${brand.locations.length} Locations` : 'Multi-location'}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light tracking-tight mb-2">
                    {brand.name}
                  </h2>
                  <p className="text-sm font-sans italic text-caramel-300/90 mb-4">
                    "{brand.tagline}"
                  </p>

                  <p className="text-sm sm:text-base text-cream-200/75 font-sans font-light leading-relaxed mb-6">
                    {brand.description}
                  </p>

                  {/* Concept Highlights */}
                  <div className="p-4 rounded-xl bg-espresso-900/50 border border-espresso-800/60 mb-6">
                    <h4 className="text-xs uppercase font-sans tracking-widest text-caramel-400 font-semibold mb-2">
                      Concept Essence
                    </h4>
                    <p className="text-xs sm:text-sm text-cream-300/80 font-sans leading-relaxed">
                      {brand.concept}
                    </p>
                  </div>

                  {/* Locations Sample */}
                  {brand.locations && brand.locations.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xs uppercase font-sans tracking-widest text-cream-400/60 font-medium mb-3 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-caramel-400" />
                        Selected Sanctuaries
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brand.locations.map((loc, lIdx) => (
                          <span
                            key={lIdx}
                            className="px-3 py-1 rounded-lg bg-espresso-950/60 border border-espresso-800/80 text-xs font-sans text-cream-200/80"
                          >
                            {loc.name} ({loc.city})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-espresso-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button
                    to={`/brands/${brand.slug}`}
                    variant="primary"
                    size="md"
                    showArrow={true}
                    className="justify-center"
                  >
                    Explore Brand Experience
                  </Button>

                  {brand.franchiseAvailable && (
                    <Button
                      to={`/franchise?brand=${brand.slug}`}
                      variant="outline"
                      size="md"
                      className="justify-center text-xs"
                    >
                      Franchise Inquiries
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Portfolio Value Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-28">
        <div className="relative rounded-3xl p-10 sm:p-16 overflow-hidden bg-gradient-to-br from-[#1b100a] to-[#120a06] border border-caramel-500/20 text-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              Expansion &amp; Operator Partnerships
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mb-6">
              Bring a PINCOF Concept to Your City.
            </h2>
            <p className="text-sm sm:text-base text-cream-200/80 font-sans font-light leading-relaxed mb-8">
              We provide qualified franchise partners with turnkey architectural blueprints, green coffee supply chain contracts, state-of-the-art equipment packages, and intensive barista training.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/franchise" variant="primary" size="lg" showArrow={true}>
                Explore Franchise Program
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Schedule a Corporate Cupping
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
