import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      if (
        direction !== scrollDirection &&
        (currentScrollY - lastScrollY > 5 || currentScrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }

      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 40);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return { scrollDirection, scrollY, isScrolled };
};

export default useScrollDirection;
