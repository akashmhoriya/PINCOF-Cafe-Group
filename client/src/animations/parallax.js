import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax effect on an element relative to its container
 */
export const animateParallax = (element, options = {}) => {
  if (!element) return;

  const {
    speed = 0.2, // speed factor: positive moves down slower, negative moves up faster
    trigger = element,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  const yMovement = speed * 120;

  return gsap.fromTo(
    element,
    {
      y: -yMovement,
    },
    {
      y: yMovement,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub: 1.2,
      },
    }
  );
};

/**
 * Horizontal scroll / pinned sequence for cinematic experience section
 */
export const createPinnedSequence = (pinContainer, horizontalTrack, options = {}) => {
  if (!pinContainer || !horizontalTrack) return;

  const scrollWidth = horizontalTrack.scrollWidth - window.innerWidth;

  return gsap.to(horizontalTrack, {
    x: () => -Math.max(scrollWidth, 300),
    ease: 'none',
    scrollTrigger: {
      trigger: pinContainer,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${Math.max(scrollWidth, 600)}`,
      invalidateOnRefresh: true,
    },
  });
};
