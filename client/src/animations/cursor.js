import gsap from 'gsap';
import { isReducedMotion, isTouchDevice } from './animationConfig';

/**
 * Initializes the dual cursor tracking engine with contextual states
 */
export const initDualCursor = (cursorDot, cursorFollower, cursorTextElement) => {
  if (!cursorDot || !cursorFollower || isReducedMotion() || isTouchDevice()) {
    return () => {};
  }

  // quickTo for pinpoint inner dot (instantaneous response)
  const dotX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power2.out' });
  const dotY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power2.out' });

  // quickTo for outer follower ring (fluid lag)
  const ringX = gsap.quickTo(cursorFollower, 'x', { duration: 0.35, ease: 'power3.out' });
  const ringY = gsap.quickTo(cursorFollower, 'y', { duration: 0.35, ease: 'power3.out' });

  let currentState = 'NORMAL';

  const setCursorState = (state, text = '') => {
    if (state === currentState) return;
    currentState = state;

    if (cursorTextElement) {
      cursorTextElement.innerText = text;
    }

    switch (state) {
      case 'VIEW':
        gsap.to(cursorFollower, {
          width: 80,
          height: 80,
          xPercent: -50,
          yPercent: -50,
          backgroundColor: 'rgba(200, 137, 73, 0.92)',
          borderColor: 'transparent',
          color: '#140c08',
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
        break;

      case 'EXPLORE':
        gsap.to(cursorFollower, {
          width: 88,
          height: 88,
          xPercent: -50,
          yPercent: -50,
          backgroundColor: 'rgba(215, 154, 91, 0.95)',
          borderColor: 'transparent',
          color: '#140c08',
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
        break;

      case 'OPEN':
        gsap.to(cursorFollower, {
          width: 72,
          height: 72,
          xPercent: -50,
          yPercent: -50,
          backgroundColor: 'rgba(250, 247, 242, 0.95)',
          borderColor: 'transparent',
          color: '#140c08',
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
        break;

      case 'LINK':
        gsap.to(cursorFollower, {
          width: 50,
          height: 50,
          xPercent: -50,
          yPercent: -50,
          backgroundColor: 'rgba(200, 137, 73, 0.15)',
          borderColor: 'rgba(200, 137, 73, 0.6)',
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, { opacity: 1, scale: 0.7, duration: 0.2 });
        break;

      case 'NORMAL':
      default:
        gsap.to(cursorFollower, {
          width: 32,
          height: 32,
          xPercent: -50,
          yPercent: -50,
          backgroundColor: 'transparent',
          borderColor: 'rgba(237, 229, 216, 0.35)',
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDot, { opacity: 1, scale: 1, duration: 0.2 });
        break;
    }
  };

  const handleMouseMove = (e) => {
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  };

  const handleMouseOver = (e) => {
    const target = e.target;

    const ctaElement = target.closest('[data-cursor="open"], .btn-cta');
    const menuCard = target.closest('[data-cursor="explore"], .menu-card-item');
    const imageElement = target.closest('[data-cursor="view"], .cursor-view');
    const linkElement = target.closest('a, button, [role="button"], input, select, textarea');

    if (ctaElement) {
      setCursorState('OPEN', 'OPEN');
    } else if (menuCard) {
      setCursorState('EXPLORE', 'EXPLORE');
    } else if (imageElement) {
      setCursorState('VIEW', 'VIEW');
    } else if (linkElement) {
      setCursorState('LINK');
    } else {
      setCursorState('NORMAL');
    }
  };

  const handleMouseLeave = () => {
    gsap.to([cursorDot, cursorFollower], { opacity: 0, duration: 0.2 });
  };

  const handleMouseEnter = () => {
    gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.2 });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mouseenter', handleMouseEnter);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('mouseenter', handleMouseEnter);
  };
};
