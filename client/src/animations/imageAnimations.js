import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS, isReducedMotion } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Technique A: Clip-path reveal from bottom
 */
export const revealFromBottom = (container, image, options = {}) => {
  if (!container || isReducedMotion()) {
    if (container) gsap.set(container, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    if (image) gsap.set(image, { scale: 1 });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    container,
    { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: options.duration || 1.4,
      ease: EASINGS.cinematicInOut,
    }
  );

  if (image) {
    tl.fromTo(
      image,
      { scale: 1.25 },
      { scale: 1, duration: options.duration || 1.4, ease: EASINGS.smooth },
      0
    );
  }

  return tl;
};

/**
 * Technique B: Clip-path reveal from left
 */
export const revealFromLeft = (container, image, options = {}) => {
  if (!container || isReducedMotion()) {
    if (container) gsap.set(container, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    container,
    { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: options.duration || 1.3,
      ease: EASINGS.cinematicInOut,
    }
  );

  if (image) {
    tl.fromTo(
      image,
      { x: -40, scale: 1.15 },
      { x: 0, scale: 1, duration: options.duration || 1.3, ease: EASINGS.smooth },
      0
    );
  }

  return tl;
};

/**
 * Technique C: Circular / Center crop expand
 */
export const revealFromCenter = (container, image, options = {}) => {
  if (!container || isReducedMotion()) {
    if (container) gsap.set(container, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    container,
    { clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)' },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: options.duration || 1.5,
      ease: EASINGS.cinematicInOut,
    }
  );

  if (image) {
    tl.fromTo(
      image,
      { scale: 1.3 },
      { scale: 1, duration: options.duration || 1.5, ease: EASINGS.smooth },
      0
    );
  }

  return tl;
};

/**
 * Technique D: Container and image move in counter directions
 */
export const revealCounterParallax = (container, image, options = {}) => {
  if (!container || isReducedMotion()) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: 1.2,
    },
  });

  if (image) {
    tl.fromTo(
      image,
      { yPercent: -15, scale: 1.1 },
      { yPercent: 15, scale: 1.02, ease: 'none' }
    );
  }

  return tl;
};

/**
 * Technique F: Sliding foreground overlay curtain
 */
export const revealSlideCurtain = (curtainElement, options = {}) => {
  if (!curtainElement || isReducedMotion()) {
    if (curtainElement) gsap.set(curtainElement, { scaleY: 0 });
    return;
  }

  return gsap.to(curtainElement, {
    scaleY: 0,
    transformOrigin: 'top',
    duration: options.duration || 1.1,
    ease: EASINGS.cinematicInOut,
    scrollTrigger: {
      trigger: curtainElement,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });
};
