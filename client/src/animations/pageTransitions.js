import gsap from 'gsap';
import { EASINGS, isReducedMotion } from './animationConfig';

/**
 * Executes an Awwwards-style multi-stage page transition wipe
 */
export const executePageTransition = (overlayRef, onMiddle, onComplete) => {
  if (!overlayRef || isReducedMotion()) {
    if (onMiddle) onMiddle();
    if (onComplete) onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlayRef, { display: 'none' });
      if (onComplete) onComplete();
    },
  });

  // Stage 1: Wipe in from bottom
  tl.set(overlayRef, {
    scaleY: 0,
    transformOrigin: 'bottom',
    display: 'flex',
  })
  .to(overlayRef, {
    scaleY: 1,
    duration: 0.42,
    ease: EASINGS.cinematicInOut,
  })
  .add(() => {
    if (onMiddle) onMiddle();
  })
  // Stage 2: Flip transform origin to top and retract
  .set(overlayRef, {
    transformOrigin: 'top',
  })
  .to(overlayRef, {
    scaleY: 0,
    duration: 0.48,
    ease: EASINGS.cinematicInOut,
  });

  return tl;
};
