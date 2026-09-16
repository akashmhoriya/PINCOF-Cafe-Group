import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS, isReducedMotion } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Text Convergence: Words start slightly displaced with subtle blur, converging smoothly
 */
export const animateTextConvergence = (element, options = {}) => {
  if (!element || isReducedMotion()) {
    if (element) gsap.set(element, { opacity: 1, filter: 'blur(0px)', y: 0 });
    return;
  }

  const {
    stagger = 0.06,
    duration = 1.2,
    delay = 0,
    yOffset = 35,
    blurAmount = 8,
  } = options;

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blurAmount}px)`,
      rotateX: -12,
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: EASINGS.cinematic,
    }
  );
};

/**
 * Text Mask Reveal: Heading emerges upwards from behind a masked container
 */
export const animateMaskReveal = (lines, options = {}) => {
  if (!lines || lines.length === 0 || isReducedMotion()) {
    if (lines) gsap.set(lines, { opacity: 1, y: '0%' });
    return;
  }

  const {
    duration = 1.3,
    stagger = 0.12,
    trigger = lines[0],
    start = 'top 85%',
  } = options;

  return gsap.fromTo(
    lines,
    {
      y: '110%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease: EASINGS.cinematic,
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
 * Word Separation on Scroll: Words spread horizontally apart on scroll scrub
 */
export const createWordSeparation = (container, leftElement, rightElement, options = {}) => {
  if (!container || isReducedMotion()) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 75%',
      end: options.end || 'bottom 25%',
      scrub: 1.2,
    },
  });

  if (leftElement) {
    tl.fromTo(leftElement, { x: 0 }, { x: -60, ease: 'none' }, 0);
  }
  if (rightElement) {
    tl.fromTo(rightElement, { x: 0 }, { x: 60, ease: 'none' }, 0);
  }

  return tl;
};

/**
 * Text Compression: Oversized statement compresses slightly on scroll
 */
export const createTextCompression = (element, options = {}) => {
  if (!element || isReducedMotion()) return;

  return gsap.fromTo(
    element,
    {
      scale: 1.15,
      letterSpacing: '0.08em',
    },
    {
      scale: 1,
      letterSpacing: '0.02em',
      ease: 'none',
      scrollTrigger: {
        trigger: options.trigger || element,
        start: options.start || 'top 85%',
        end: options.end || 'bottom 40%',
        scrub: 1,
      },
    }
  );
};
