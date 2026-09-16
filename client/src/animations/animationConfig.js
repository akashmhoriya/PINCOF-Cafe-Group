import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Animation Configuration & Easing Curves
 */
export const EASINGS = {
  // Ultra-luxurious editorial easing curves
  luxury: 'cubic-bezier(0.25, 1, 0.5, 1)',
  cinematic: 'power4.out',
  cinematicInOut: 'power4.inOut',
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  snappy: 'expo.out',
  gentle: 'power2.out',
  elastic: 'back.out(1.6)',
};

export const DURATIONS = {
  micro: 0.3,
  quick: 0.5,
  standard: 0.8,
  imageReveal: 1.2,
  cinematic: 1.6,
  slow: 2.2,
};

/**
 * Checks if user prefers reduced motion
 */
export const isReducedMotion = () => {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

/**
 * Checks if current device is touch/mobile
 */
export const isTouchDevice = () => {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024 ||
      window.matchMedia('(pointer: coarse)').matches)
  );
};
