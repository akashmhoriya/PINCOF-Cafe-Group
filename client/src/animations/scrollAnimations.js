import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, isTouchDevice } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll Velocity Skew: Elements skew subtly based on scroll speed, relaxing smoothly to 0
 */
export const createScrollSkew = (targets, options = {}) => {
  if (!targets || isReducedMotion() || isTouchDevice()) return;

  const { maxSkew = 3.5, ease = 'power3.out' } = options;
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  if (!elements || elements.length === 0) return;

  // Use gsap.quickTo for high-performance 120fps interpolation
  const setSkew = gsap.quickTo(elements, 'skewY', {
    duration: 0.8,
    ease,
  });

  return ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = self.getVelocity();
      // Clamp skew to prevent extreme distortion
      const skew = gsap.utils.clamp(-maxSkew, maxSkew, velocity / 320);
      setSkew(skew);
    },
  });
};

/**
 * Multi-layer Parallax System: Reusable parallax speed mapper
 */
export const createParallax = (element, speed = 0.2, options = {}) => {
  if (!element || isReducedMotion()) return;

  const { trigger = element, start = 'top bottom', end = 'bottom top' } = options;
  const effectiveSpeed = isTouchDevice() ? speed * 0.4 : speed;
  const yDistance = effectiveSpeed * 100;

  return gsap.fromTo(
    element,
    { y: -yDistance },
    {
      y: yDistance,
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
 * Section Background Tone Interpolation: Smooth color transitions across sections
 */
export const createBackgroundTransition = (triggerSection, targetBackground, colors = {}) => {
  if (!triggerSection || !targetBackground || isReducedMotion()) return;

  const { from = '#140c08', to = '#1c120c' } = colors;

  return gsap.fromTo(
    targetBackground,
    { backgroundColor: from },
    {
      backgroundColor: to,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerSection,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1.5,
      },
    }
  );
};
