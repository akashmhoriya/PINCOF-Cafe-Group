import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { createMagnetic } from '../animations/magnetic';

export const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  className = '',
  type = 'button',
  disabled = false,
  magnetic = true,
  ...props
}) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (magnetic && btnRef.current) {
      const cleanup = createMagnetic(btnRef.current, {
        strength: 0.28,
        textElement: textRef.current,
        textStrength: 0.45,
      });
      return cleanup;
    }
  }, [magnetic]);

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans font-medium tracking-wider uppercase transition-all duration-300 group overflow-hidden select-none disabled:opacity-50 disabled:pointer-events-none will-change-transform';

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5 rounded-full',
    md: 'text-xs md:text-sm px-6 py-3.5 gap-2 rounded-full',
    lg: 'text-sm md:text-base px-8 py-4 gap-2.5 rounded-full',
  };

  const variants = {
    primary:
      'btn-cta bg-caramel-500 text-espresso-950 hover:bg-caramel-400 hover:shadow-[0_0_30px_rgba(200,137,73,0.4)] active:scale-[0.98]',
    outline:
      'border border-cream-300/40 text-cream-100 hover:border-caramel-400 hover:text-caramel-400 hover:bg-caramel-500/10 active:scale-[0.98]',
    secondary:
      'bg-espresso-800 text-cream-100 border border-espresso-700 hover:bg-espresso-700 hover:text-white active:scale-[0.98]',
    ghost:
      'text-cream-200 hover:text-caramel-400 bg-transparent p-0 tracking-widest',
  };

  const content = (
    <>
      <span ref={textRef} className="relative z-10 flex items-center gap-2 transition-transform duration-300">
        {children}
        {showArrow && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-caramel-300" />
        )}
      </span>
      {/* Expanding hover backdrop pill */}
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-white/10 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-full"
      />
    </>
  );

  const combinedClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;
  const cursorAttribute = variant === 'primary' ? 'open' : undefined;

  if (to) {
    return (
      <Link
        ref={btnRef}
        to={to}
        data-cursor={cursorAttribute}
        className={combinedClasses}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={cursorAttribute}
        className={combinedClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor={cursorAttribute}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
