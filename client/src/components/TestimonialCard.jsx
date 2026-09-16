import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialCard = ({ testimonial, className = '' }) => {
  if (!testimonial) return null;

  return (
    <div
      className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl glass-card text-left transition-all duration-300 hover:border-caramel-500/40 ${className}`}
    >
      <Quote className="w-10 h-10 text-caramel-500/20 mb-4" />

      {/* Star Ratings */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'text-caramel-400 fill-caramel-400'
                : 'text-espresso-700'
            }`}
          />
        ))}
      </div>

      {/* Review Body */}
      <blockquote className="font-serif text-lg sm:text-xl text-cream-100 font-light leading-relaxed italic mb-8">
        "{testimonial.review}"
      </blockquote>

      {/* User Info */}
      <div className="flex items-center justify-between border-t border-espresso-800/80 pt-6">
        <div className="flex items-center gap-3.5">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border border-caramel-500/30"
          />
          <div>
            <h4 className="font-sans text-sm font-semibold text-cream-100">
              {testimonial.name}
            </h4>
            <p className="text-xs text-cream-300/60 font-sans">
              {testimonial.role} &bull; {testimonial.location}
            </p>
          </div>
        </div>

        {testimonial.favoriteItem && (
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] uppercase font-sans tracking-widest text-caramel-400/70">
              Favorite Sip
            </span>
            <span className="text-xs font-serif text-cream-200">
              {testimonial.favoriteItem}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
