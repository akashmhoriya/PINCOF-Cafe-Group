import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
}) => {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignmentClass} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.25em] text-caramel-400 mb-3 px-3 py-1 rounded-full bg-caramel-500/10 border border-caramel-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel-400 animate-pulse" />
          {badge}
        </span>
      )}
      {title && (
        <h2
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream-100 font-light tracking-tight leading-[1.15] ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-sm md:text-base lg:text-lg text-cream-300/80 max-w-2xl font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
