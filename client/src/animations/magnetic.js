import gsap from 'gsap';
import { isReducedMotion, isTouchDevice } from './animationConfig';

/**
 * Creates physics-based magnetic pull for interactive buttons and cards
 * @param {HTMLElement} element - Target DOM element
 * @param {object} options - Magnetic strength and damping options
 */
export const createMagnetic = (element, options = {}) => {
  if (!element || isReducedMotion() || isTouchDevice()) return;

  const {
    strength = 0.35, // Distance multiplier
    textElement = null, // Optional inner text element that moves further (parallax within button)
    textStrength = 0.55,
  } = options;

  const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' });

  let textXTo = null;
  let textYTo = null;
  if (textElement) {
    textXTo = gsap.quickTo(textElement, 'x', { duration: 0.6, ease: 'power3.out' });
    textYTo = gsap.quickTo(textElement, 'y', { duration: 0.6, ease: 'power3.out' });
  }

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xTo(deltaX);
    yTo(deltaY);

    if (textXTo && textYTo) {
      textXTo(deltaX * textStrength);
      textYTo(deltaY * textStrength);
    }
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
    if (textXTo && textYTo) {
      textXTo(0);
      textYTo(0);
    }
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
