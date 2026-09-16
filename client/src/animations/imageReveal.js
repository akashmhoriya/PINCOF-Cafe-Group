import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial image reveal with clipping mask and scale down
 */
export const animateImageReveal = (container, image, options = {}) => {
  if (!container) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options.start || 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    container,
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: options.duration || 1.4,
      ease: 'power4.inOut',
    }
  );

  if (image) {
    tl.fromTo(
      image,
      {
        scale: 1.25,
        filter: 'grayscale(30%)',
      },
      {
        scale: 1,
        filter: 'grayscale(0%)',
        duration: options.duration || 1.4,
        ease: 'power3.out',
      },
      0
    );
  }

  return tl;
};
