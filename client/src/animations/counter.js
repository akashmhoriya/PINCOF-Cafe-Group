import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates a numerical counter from 0 to target value on scroll
 */
export const animateCounter = (element, targetValue, options = {}) => {
  if (!element) return;

  const {
    duration = 2.0,
    decimals = 0,
    suffix = '',
    trigger = element,
    start = 'top 85%',
  } = options;

  const counterObj = { val: 0 };

  return gsap.to(counterObj, {
    val: targetValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      const current = decimals > 0 
        ? counterObj.val.toFixed(decimals) 
        : Math.floor(counterObj.val);
      element.innerText = `${current}${suffix}`;
    },
  });
};
