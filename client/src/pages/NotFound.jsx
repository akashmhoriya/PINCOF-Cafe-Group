import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Button from '../components/Button';

export const NotFound = () => {
  useDocumentTitle('404 Not Found', 'The requested café page could not be found.');

  const containerRef = useRef(null);
  const cupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Float / tilt coffee cup illustration
      gsap.to(cupRef.current, {
        y: -12,
        rotate: 6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Entrance animation
      gsap.fromTo(
        containerRef.current?.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 sm:px-8 py-24"
    >
      {/* Floating Animated Cup Symbol */}
      <div
        ref={cupRef}
        className="w-24 h-24 rounded-full border border-caramel-500/40 bg-caramel-500/10 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(200,137,73,0.2)]"
      >
        <Coffee className="w-10 h-10 text-caramel-400" />
      </div>

      {/* 404 Error Code */}
      <span className="font-serif text-7xl sm:text-9xl text-caramel-400/40 font-light select-none tracking-tight">
        404
      </span>

      {/* Editorial Headline */}
      <h1 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light mt-2 mb-4">
        Looks like you've wandered <br />
        <span className="italic text-caramel-300">off the menu.</span>
      </h1>

      {/* Description */}
      <p className="max-w-md text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed mb-10">
        The page you are looking for might have been moved, renamed, or steeped too long. Let us guide you back to warm espresso.
      </p>

      {/* Back Home CTA Button */}
      <Button to="/" variant="primary" size="lg" className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        <span>Back Home</span>
      </Button>
    </div>
  );
};

export default NotFound;
