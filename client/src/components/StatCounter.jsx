import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StatCounter = ({
  value,
  suffix = '',
  decimals = 0,
  label,
  description,
  className = '',
}) => {
  const numberRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (numberRef.current) {
        const finalVal = decimals > 0 ? Number(value).toFixed(decimals) : value;
        numberRef.current.innerText = `${finalVal}${suffix}`;
      }
      return;
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: value,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (numberRef.current) {
            const current = decimals > 0
              ? counterObj.val.toFixed(decimals)
              : Math.floor(counterObj.val);
            numberRef.current.innerText = `${current}${suffix}`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, suffix, decimals]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl glass-card relative overflow-hidden group hover:border-caramel-500/40 transition-colors ${className}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-caramel-500/5 rounded-full blur-2xl group-hover:bg-caramel-500/10 transition-colors pointer-events-none" />

      <span
        ref={numberRef}
        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-caramel-400 tracking-tight"
      >
        0{suffix}
      </span>

      <h3 className="mt-3 font-serif text-lg sm:text-xl text-cream-100 font-medium tracking-wide">
        {label}
      </h3>

      {description && (
        <p className="mt-1 text-xs sm:text-sm text-cream-300/60 font-sans max-w-[220px]">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCounter;
