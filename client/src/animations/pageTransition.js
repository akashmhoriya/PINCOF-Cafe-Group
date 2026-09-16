import gsap from 'gsap';

/**
 * Executes a cinematic wipe transition across routes
 * @param {HTMLElement} overlayRef - Fullscreen transition overlay element
 * @param {Function} onComplete - Callback executed once entrance animation completes
 */
export const executePageTransitionIn = (overlayRef, onComplete) => {
  if (!overlayRef) {
    if (onComplete) onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  tl.set(overlayRef, {
    scaleY: 0,
    transformOrigin: 'bottom',
    display: 'block',
  })
  .to(overlayRef, {
    scaleY: 1,
    duration: 0.38,
    ease: 'power3.inOut',
  });

  return tl;
};

export const executePageTransitionOut = (overlayRef, onComplete) => {
  if (!overlayRef) {
    if (onComplete) onComplete();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(overlayRef, { display: 'none' });
      if (onComplete) onComplete();
    },
  });

  tl.set(overlayRef, {
    scaleY: 1,
    transformOrigin: 'top',
  })
  .to(overlayRef, {
    scaleY: 0,
    duration: 0.45,
    ease: 'power3.inOut',
  });

  return tl;
};
