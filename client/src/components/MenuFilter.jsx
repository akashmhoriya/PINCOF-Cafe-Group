import React from 'react';

const CATEGORIES = [
  'All',
  'Signature',
  'Coffee',
  'Cold Coffee',
  'Tea',
  'Breakfast',
  'Snacks',
  'Desserts',
];

export const MenuFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-[#1c120c] border border-caramel-500/20 shadow-inner">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              type="button"
              data-cursor="link"
              onClick={() => onSelectCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap select-none active:scale-95 ${
                isActive
                  ? 'bg-caramel-500 text-espresso-950 font-semibold shadow-md shadow-caramel-500/20 scale-[1.02]'
                  : 'text-cream-300/70 hover:text-cream-100 hover:bg-espresso-800/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuFilter;
