import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Leaf, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getMenuItems } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import MenuCard from '../components/MenuCard';
import MenuFilter from '../components/MenuFilter';
import { createScrollSkew } from '../animations/scrollAnimations';

export const Menu = () => {
  useDocumentTitle(
    'Coffee & Café Menu',
    'Explore our artisanal selection of single-origin pour-overs, botanical tonics, viennoiserie, and slow breakfast plates.'
  );

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);

  const cardsGridRef = useRef(null);

  // Fetch Menu from API / MongoDB
  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch (err) {
      setError('Unable to retrieve the menu. Please check your network or try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Filter items based on Category, Search Query, and Vegetarian toggle
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      item.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      trimmedSearch === '' ||
      item.name.toLowerCase().includes(trimmedSearch) ||
      item.description.toLowerCase().includes(trimmedSearch);

    const matchesVegetarian = onlyVegetarian ? item.vegetarian === true : true;

    return matchesCategory && matchesSearch && matchesVegetarian;
  });

  // Animate cards on category/filter change with GSAP & velocity skew
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (cardsGridRef.current && filteredItems.length > 0) {
      const ctx = gsap.context(() => {
        const cards = cardsGridRef.current.querySelectorAll('.menu-card-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.05,
            ease: 'power3.out',
          }
        );

        // Velocity skew during scroll
        createScrollSkew('.menu-card-item', { maxSkew: 3 });
      }, cardsGridRef);

      return () => ctx.revert();
    }
  }, [activeCategory, onlyVegetarian, searchQuery, filteredItems.length]);

  return (
    <div className="min-h-screen pt-28 pb-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-caramel-400 mb-4 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
          <span>PINCOF Portfolio Menu &bull; Aurelia Slow Bar &amp; Roastery</span>
        </div>
        <SectionHeading
          badge="Flagship Specialty Concept"
          title="Made To Be Sipped."
          subtitle="Every bean is selected by origin altitude, roasted in micro-lots, and extracted at exacting brew ratios. Accompanied by fresh viennoiserie baked at sunrise."
        />
        <div className="mt-4">
          <Link
            to="/brands"
            className="text-xs font-sans uppercase tracking-widest text-cream-300/60 hover:text-caramel-400 transition-colors underline underline-offset-4"
          >
            Looking for another concept? Explore All PINCOF Brands &rarr;
          </Link>
        </div>
      </div>

      {/* Interactive Controls & Category Filter */}
      <div className="flex flex-col items-center space-y-6 mb-12">
        {/* Category Pills */}
        <MenuFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Search Bar & Vegetarian Toggle */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-cream-300/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor, bean, or pastry..."
              className="w-full bg-espresso-900/80 border border-cream-300/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-cream-100 placeholder:text-cream-300/40 focus:outline-none focus:border-caramel-400 transition-colors"
            />
          </div>

          {/* Vegetarian Toggle & Count */}
          <div className="flex items-center gap-4 text-xs font-sans text-cream-300/70">
            <button
              type="button"
              onClick={() => setOnlyVegetarian(!onlyVegetarian)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border transition-colors ${
                onlyVegetarian
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'border-cream-300/15 hover:border-cream-300/40 text-cream-300/70'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Vegetarian Only</span>
            </button>

            <span className="text-[11px] uppercase tracking-widest text-caramel-400">
              {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        </div>
      </div>

      {/* Content State: Loading, Error, Empty, or Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-10 h-10 border-2 border-caramel-400 border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-xl text-cream-200">
            Gathering harvest selections from our slow bar...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center glass-card p-8 rounded-2xl max-w-lg mx-auto">
          <p className="text-red-300 text-sm font-sans mb-4">{error}</p>
          <button
            onClick={fetchMenu}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-caramel-500 text-espresso-950 font-sans text-xs uppercase tracking-wider font-semibold hover:bg-caramel-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center glass-card p-10 rounded-2xl max-w-md mx-auto">
          <Sparkles className="w-8 h-8 text-caramel-400 mb-3" />
          <h3 className="font-serif text-2xl text-cream-100 mb-2">No Matching Brews</h3>
          <p className="text-xs text-cream-300/70 font-sans leading-relaxed mb-6">
            We couldn't find any items matching your selected criteria. Try adjusting your search query or category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
              setOnlyVegetarian(false);
            }}
            className="px-5 py-2 rounded-full border border-caramel-400 text-caramel-400 hover:bg-caramel-500/10 text-xs font-sans uppercase tracking-widest transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => (
            <MenuCard key={item._id || item.name} item={item} />
          ))}
        </div>
      )}

      {/* Botanical & Dietary Note */}
      <div className="mt-20 p-6 sm:p-8 rounded-2xl glass-card border border-caramel-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream-300/70">
        <div>
          <span className="font-semibold text-caramel-400 uppercase tracking-widest mr-2">
            Dairy &amp; Plant Milks:
          </span>
          <span>
            House organic oat milk, almond cream, and grass-fed local dairy available across all espresso beverages.
          </span>
        </div>
        <span className="text-[11px] text-cream-400/50 uppercase tracking-wider">
          Single-Origin Roast Ratios 1:2
        </span>
      </div>
    </div>
  );
};

export default Menu;
