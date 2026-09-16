import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const PageTransition = () => {
  const overlayRef = useRef(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load to let LoadingScreen shine
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    // Scroll window to top smoothly on route change
    window.scrollTo(0, 0);

    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();

    // Cinematic wipe in and out
    tl.set(overlay, {
      scaleY: 0,
      transformOrigin: 'bottom',
      display: 'block',
    })
    .to(overlay, {
      scaleY: 1,
      duration: 0.32,
      ease: 'power3.in',
    })
    .set(overlay, {
      transformOrigin: 'top',
    })
    .to(overlay, {
      scaleY: 0,
      duration: 0.42,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set(overlay, { display: 'none' });
      },
    });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9990] bg-[#140c08] pointer-events-none origin-bottom"
      style={{ display: 'none' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c120c] to-[#140c08] flex items-center justify-center">
        <span className="font-serif text-3xl tracking-[0.3em] text-caramel-400 font-light uppercase">
          AURELIA
        </span>
      </div>
    </div>
  );
};

export default PageTransition;
