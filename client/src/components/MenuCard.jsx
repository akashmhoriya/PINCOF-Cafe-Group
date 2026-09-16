import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Leaf, Sparkles } from 'lucide-react';
import { createCardHoverTimeline } from '../animations/menuAnimations';

export const MenuCard = ({ item, className = '' }) => {
  if (!item) return null;

  const cardRef = useRef(null);
  const hoverTlRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      hoverTlRef.current = createCardHoverTimeline(cardRef.current);
    }
    return () => {
      if (hoverTlRef.current) {
        hoverTlRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTlRef.current) {
      hoverTlRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (hoverTlRef.current) {
      hoverTlRef.current.reverse();
    }
  };

  return (
    <div
      ref={cardRef}
      data-cursor="explore"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`menu-card-item relative flex flex-col rounded-2xl overflow-hidden glass-card border border-cream-300/10 cursor-pointer will-change-transform ${className}`}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-espresso-900">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover will-change-transform"
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140c08] via-transparent to-black/20 opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] uppercase font-sans tracking-widest font-semibold px-2.5 py-1 rounded-full bg-espresso-950/80 backdrop-blur-md text-caramel-300 border border-caramel-500/20">
            {item.category}
          </span>
          <div className="flex items-center gap-1.5">
            {item.featured && (
              <span className="flex items-center gap-1 text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-caramel-500/90 text-espresso-950">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
            {item.vegetarian && (
              <span
                title="Vegetarian"
                className="p-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
              >
                <Leaf className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Price Tag Pill */}
        <div className="price-pill absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#140c08]/90 backdrop-blur-md border border-caramel-500/30 text-caramel-400 font-serif font-semibold text-base sm:text-lg will-change-transform">
          ${Number(item.price).toFixed(2)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-[#19100a]/70">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-medium">
              {item.name}
            </h3>
            <div className="card-arrow w-8 h-8 rounded-full border border-cream-300/10 flex items-center justify-center text-cream-300 flex-shrink-0 will-change-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="card-desc mt-2 text-xs sm:text-sm text-cream-300/70 font-sans line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-espresso-800/80 flex items-center justify-between text-[11px] font-sans text-cream-300/50 uppercase tracking-widest">
          <span>{item.available !== false ? 'Available Daily' : 'Sold Out Today'}</span>
          <span className="text-caramel-400 font-medium">Explore Notes</span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
