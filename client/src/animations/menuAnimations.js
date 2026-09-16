import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS, isReducedMotion } from './animationConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal scrolling experience for the featured menu
 */
export const createFeaturedMenuHorizontalScroll = (pinContainer, horizontalTrack) => {
  if (!pinContainer || !horizontalTrack || isReducedMotion()) return;

  const cards = horizontalTrack.querySelectorAll('.menu-card-item');

  ScrollTrigger.matchMedia({
    // Desktop: Pin and scrub horizontally with dynamic card rotation and zoom
    '(min-width: 1024px)': function () {
      const scrollDistance = horizontalTrack.scrollWidth - window.innerWidth + 160;

      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      horizontalTl.to(horizontalTrack, {
        x: () => -scrollDistance,
        ease: 'none',
      });

      // While moving: cards subtly rotate and scale dynamically
      cards.forEach((card, index) => {
        const rotateDirection = index % 2 === 0 ? 2.5 : -2.5;

        horizontalTl.fromTo(
          card,
          { rotate: -rotateDirection, scale: 0.96 },
          {
            rotate: rotateDirection,
            scale: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTl,
              start: 'left right',
              end: 'right left',
              scrub: 1,
            },
          },
          0
        );
      });
    },
  });
};

/**
 * Advanced Menu Card Hover Timeline (forward / reverse)
 */
export const createCardHoverTimeline = (cardElement) => {
  if (!cardElement || isReducedMotion()) return { play: () => {}, reverse: () => {} };

  const image = cardElement.querySelector('img');
  const arrow = cardElement.querySelector('.card-arrow');
  const pricePill = cardElement.querySelector('.price-pill');
  const desc = cardElement.querySelector('.card-desc');

  const tl = gsap.timeline({ paused: true });

  tl.to(
    cardElement,
    {
      y: -8,
      borderColor: 'rgba(200, 137, 73, 0.45)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
      duration: 0.4,
      ease: EASINGS.smooth,
    },
    0
  );

  if (image) {
    tl.to(
      image,
      {
        scale: 1.12,
        x: 4,
        duration: 0.6,
        ease: EASINGS.smooth,
      },
      0
    );
  }

  if (arrow) {
    tl.to(
      arrow,
      {
        x: 3,
        y: -3,
        borderColor: 'rgba(200, 137, 73, 0.8)',
        color: '#c88949',
        duration: 0.35,
        ease: EASINGS.smooth,
      },
      0
    );
  }

  if (pricePill) {
    tl.to(
      pricePill,
      {
        scale: 1.06,
        borderColor: 'rgba(200, 137, 73, 0.6)',
        duration: 0.35,
        ease: EASINGS.snappy,
      },
      0
    );
  }

  return tl;
};
