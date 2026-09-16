import React, { useRef } from 'react';
import gsap from 'gsap';
import { EASINGS, isReducedMotion } from '../animations/animationConfig';

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Hand-Crafted Pour Over Ritual",
    category: "Slow Bar",
    aspect: "col-span-1 md:col-span-2 row-span-2 h-[420px] md:h-[500px]",
    url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Artisan Micro-Lot Roasting",
    category: "Roastery Lab",
    aspect: "col-span-1 md:col-span-1 row-span-1 h-[200px] md:h-[240px]",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Cold Brew Immersion Chambers",
    category: "Craft Science",
    aspect: "col-span-1 md:col-span-1 row-span-1 h-[200px] md:h-[240px]",
    url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Architectural Interior & Slow Seating",
    category: "The Space",
    aspect: "col-span-1 md:col-span-1 row-span-1 h-[200px] md:h-[240px]",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Fresh Baked Morning Viennoiserie",
    category: "Bakery",
    aspect: "col-span-1 md:col-span-1 row-span-1 h-[200px] md:h-[240px]",
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  },
];

export const Gallery = () => {
  const gridRef = useRef(null);

  const handleMouseEnterItem = (e) => {
    if (isReducedMotion() || !gridRef.current) return;
    const currentItem = e.currentTarget;
    const allItems = gridRef.current.querySelectorAll('.gallery-item');

    allItems.forEach((item) => {
      if (item === currentItem) {
        gsap.to(item, {
          scale: 1.02,
          opacity: 1,
          borderColor: 'rgba(200, 137, 73, 0.5)',
          duration: 0.45,
          ease: EASINGS.smooth,
        });
      } else {
        gsap.to(item, {
          scale: 0.98,
          opacity: 0.45,
          duration: 0.45,
          ease: EASINGS.smooth,
        });
      }
    });
  };

  const handleMouseLeaveGrid = () => {
    if (isReducedMotion() || !gridRef.current) return;
    const allItems = gridRef.current.querySelectorAll('.gallery-item');

    gsap.to(allItems, {
      scale: 1,
      opacity: 1,
      borderColor: 'rgba(237, 229, 216, 0.1)',
      duration: 0.5,
      ease: EASINGS.smooth,
    });
  };

  return (
    <div
      ref={gridRef}
      onMouseLeave={handleMouseLeaveGrid}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
    >
      {GALLERY_IMAGES.map((item) => (
        <div
          key={item.id}
          data-cursor="view"
          onMouseEnter={handleMouseEnterItem}
          className={`gallery-item relative rounded-2xl overflow-hidden group cursor-view ${item.aspect} bg-espresso-900 border border-cream-300/10 will-change-transform`}
        >
          {/* Background image with hover zoom */}
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

          {/* Editorial hover caption with mask reveal */}
          <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end pointer-events-none">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold mb-1 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
              {item.category}
            </span>
            <h4 className="font-serif text-base sm:text-lg md:text-xl text-cream-100 font-light leading-snug translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              {item.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
