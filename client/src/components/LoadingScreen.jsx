import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  const dividerRef = useRef(null);
  const contentRef = useRef(null);
  const beanPathRef = useRef(null);
  const beanFillRef = useRef(null);
  const logoTextRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Initial state setup
      gsap.set(logoTextRef.current, { opacity: 0, y: 25, filter: 'blur(6px)' });
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'center' });

      // 2. Draw bean stroke & pulse fill
      tl.to(beanPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      })
      .to(beanFillRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
      }, '-=0.4')
      // 3. Reveal café logo & tagline with blur removal
      .to(logoTextRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.4')
      // 4. Expand divider & smooth progress bar fill
      .to(dividerRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.4')
      // 5. Cinematic Split Reveal: Content dissolves while dual curtains part
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.92,
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.15,
      })
      .to(dividerRef.current, {
        opacity: 0,
        scaleY: 0,
        duration: 0.3,
      }, '-=0.3')
      .to(topCurtainRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut',
      }, '-=0.2')
      .to(bottomCurtainRef.current, {
        yPercent: 100,
        duration: 1.0,
        ease: 'power4.inOut',
      }, '<');
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      aria-label="Loading PINCOF Hospitality & Café Brands Group"
      className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none"
    >
      {/* Top Curtain Panel */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#140c08] border-b border-espresso-800/40 pointer-events-auto"
      />

      {/* Bottom Curtain Panel */}
      <div
        ref={bottomCurtainRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#140c08] border-t border-espresso-800/40 pointer-events-auto"
      />

      {/* Golden Center Split Indicator */}
      <div
        ref={dividerRef}
        className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-caramel-500/70 to-transparent z-10 pointer-events-none"
      />

      {/* Loading Content Foreground */}
      <div
        ref={contentRef}
        className="relative z-20 w-full h-full flex flex-col items-center justify-center text-[#ede5d8] px-6 pointer-events-auto"
      >
        {/* Decorative ambient glow */}
        <div className="absolute w-96 h-96 rounded-full bg-caramel-600/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center">
          {/* Coffee Bean SVG Symbol */}
          <div className="relative w-24 h-24 mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Bean Outer Silhouette */}
              <path
                ref={beanPathRef}
                d="M50 15 C30 15, 18 30, 18 50 C18 70, 30 85, 50 85 C70 85, 82 70, 82 50 C82 30, 70 15, 50 15 Z"
                fill="none"
                stroke="#c88949"
                strokeWidth="2.5"
                strokeDasharray="260"
                strokeDashoffset="260"
              />
              {/* Center Organic Crease */}
              <path
                d="M50 16 C57 32, 43 68, 50 84"
                fill="none"
                stroke="#c88949"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Subtle Bean Core Glow */}
              <circle
                ref={beanFillRef}
                cx="50"
                cy="50"
                r="22"
                fill="#261710"
                className="opacity-0 scale-50 transform origin-center transition-all"
              />
            </svg>
          </div>

          {/* Group Brand Typography */}
          <h1
            ref={logoTextRef}
            className="font-serif text-3xl md:text-5xl tracking-[0.25em] text-[#faf7f2] uppercase font-light text-center"
          >
            PINCOF
          </h1>
          <p
            ref={subtitleRef}
            className="mt-2 text-xs md:text-sm tracking-[0.3em] text-caramel-400 font-sans uppercase font-medium"
          >
            Café &amp; Coffee Brands Group
          </p>

          {/* Minimal Progress Bar */}
          <div className="w-48 h-[2px] bg-espresso-800/80 rounded-full mt-8 overflow-hidden">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-gradient-to-r from-caramel-500 to-amber-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
