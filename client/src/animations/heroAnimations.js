import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS, DURATIONS, isReducedMotion } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates the master cinematic Hero entrance sequence
 */
export const createHeroEntranceSequence = ({
  overlayRef,
  heroBgRef,
  heroMidgroundRef,
  heroForegroundRef,
  heroTitleRef,
  heroSubRef,
  heroCtaRef,
  scrollIndicatorRef,
  onComplete,
}) => {
  if (isReducedMotion()) {
    if (overlayRef) gsap.set(overlayRef, { display: 'none' });
    if (heroBgRef) gsap.set(heroBgRef, { opacity: 1, scale: 1 });
    if (heroTitleRef) gsap.set(heroTitleRef.querySelectorAll('.hero-char, .hero-word, .hero-line'), { opacity: 1, y: 0, filter: 'blur(0px)' });
    if (heroSubRef) gsap.set(heroSubRef, { opacity: 1, y: 0 });
    if (heroCtaRef) gsap.set(heroCtaRef.children, { opacity: 1, y: 0 });
    if (onComplete) onComplete();
    return;
  }

  const masterTl = gsap.timeline({
    delay: 0.1,
    onComplete: () => {
      if (onComplete) onComplete();
    },
  });

  // 1. Initial State
  masterTl.set(heroBgRef, { scale: 1.25, filter: 'blur(10px) brightness(0.2)' });
  if (heroMidgroundRef) masterTl.set(heroMidgroundRef, { scale: 1.15, opacity: 0, y: 40 });
  if (heroForegroundRef) masterTl.set(heroForegroundRef, { opacity: 0 });

  // 2. Unveil Hero Image through Mask & Settle
  masterTl
    .to(heroBgRef, {
      scale: 1,
      filter: 'blur(0px) brightness(0.42)',
      duration: 2.2,
      ease: EASINGS.cinematicInOut,
    })
    .to(
      heroMidgroundRef,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        ease: EASINGS.cinematic,
      },
      '-=1.6'
    )
    .to(
      heroForegroundRef,
      {
        opacity: 0.8,
        duration: 1.5,
        ease: EASINGS.smooth,
      },
      '-=1.4'
    );

  // 3. Characters/Words Convergence with Blur Removal
  const titleChars = heroTitleRef?.querySelectorAll('.hero-word');
  if (titleChars && titleChars.length > 0) {
    masterTl.fromTo(
      titleChars,
      {
        opacity: 0,
        y: 75,
        filter: 'blur(12px)',
        rotateX: -15,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotateX: 0,
        scale: 1,
        duration: 1.4,
        stagger: 0.09,
        ease: EASINGS.cinematic,
      },
      '-=1.2'
    );
  }

  // 4. Subtitle & Staggered Details
  if (heroSubRef) {
    masterTl.fromTo(
      heroSubRef,
      { opacity: 0, y: 30, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: EASINGS.smooth,
      },
      '-=0.8'
    );
  }

  // 5. CTA Buttons reveal from behind masked container
  if (heroCtaRef) {
    masterTl.fromTo(
      heroCtaRef.children,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: EASINGS.elastic,
      },
      '-=0.7'
    );
  }

  // 6. Scroll Indicator begins fluid floating
  if (scrollIndicatorRef) {
    masterTl.fromTo(
      scrollIndicatorRef,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASINGS.smooth,
      },
      '-=0.5'
    );
  }

  return masterTl;
};

/**
 * Creates 3-layer parallax depth on scroll scrub
 */
export const createHeroParallaxDepth = ({
  heroSection,
  bgLayer,
  midLayer,
  fgLayer,
  titleLayer,
}) => {
  if (isReducedMotion() || !heroSection) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
    },
  });

  // Layer 1: Background moves slow
  if (bgLayer) {
    tl.to(bgLayer, { yPercent: 25, scale: 1.05, ease: 'none' }, 0);
  }

  // Layer 2: Midground (coffee product) moves medium
  if (midLayer) {
    tl.to(midLayer, { yPercent: 45, scale: 0.95, ease: 'none' }, 0);
  }

  // Layer 3: Foreground particles move faster
  if (fgLayer) {
    tl.to(fgLayer, { yPercent: 70, ease: 'none' }, 0);
  }

  // Typography Transformation: Title scales up, lifts and fades
  if (titleLayer) {
    tl.to(
      titleLayer,
      {
        yPercent: -40,
        scale: 1.12,
        opacity: 0,
        filter: 'blur(6px)',
        ease: 'power2.in',
      },
      0
    );
  }

  return tl;
};
