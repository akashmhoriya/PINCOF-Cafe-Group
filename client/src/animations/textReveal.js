import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates text elements upward with a staggered fade
 * @param {HTMLElement|string} element - DOM element or selector
 * @param {object} options - Custom options
 */
export const animateTextReveal = (element, options = {}) => {
  if (!element) return;

  const {
    delay = 0,
    duration = 1.1,
    stagger = 0.08,
    yOffset = 40,
    trigger = element,
    start = 'top 85%',
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: yOffset,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: 'play none none none',
          }
        : undefined,
    }
  );
};

/**
 * Split text reveal for editorial headings
 */
export const animateHeadingLines = (lines, options = {}) => {
  if (!lines || lines.length === 0) return;

  return gsap.fromTo(
    lines,
    {
      y: '100%',
      opacity: 0,
      rotateX: -15,
    },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: options.duration || 1.2,
      stagger: options.stagger || 0.12,
      ease: 'power4.out',
      delay: options.delay || 0,
    }
  );
};
