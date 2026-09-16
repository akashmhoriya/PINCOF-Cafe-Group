import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText } from 'lucide-react';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CAFE_INFO } from '../data/cafeInfo';

export const TermsConditions = () => {
  useDocumentTitle('Terms & Conditions', 'Read the official Terms and Conditions of Aurelia Specialty Coffee Roasters.');

  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.querySelectorAll('.terms-section'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, []);

  const sections = [
    {
      title: '1. Introduction',
      content:
        'These Terms & Conditions ("Terms") govern your access to and use of the website, dining facilities, roasting subscriptions, and reservation services provided by Aurelia Specialty Coffee Roasters & Slow Bar LLC ("Aurelia"). By browsing or engaging our services, you agree to comply with and be bound by these Terms.',
    },
    {
      title: '2. Website Usage',
      content:
        'You are granted a revocable, non-exclusive, non-transferable license to access our website for informational, non-commercial purposes. You agree not to disrupt server performance, reverse engineer software assets, or scrape menu and media content without express written consent.',
    },
    {
      title: '3. Café Services & Slow Bar Code',
      content:
        'Aurelia strives to provide a serene, contemplative atmosphere for all guests. We reserve the right to decline service or request departure if a guest engages in disruptive behavior, harassment, or actions that compromise the well-being of patrons or staff.',
    },
    {
      title: '4. Orders, Pricing & Payments',
      content:
        'Prices for beverages, micro-lot beans, and bakery items are displayed in USD and subject to local sales tax. While we make every effort to ensure accurate online pricing, prices and seasonal harvest availability are subject to adjustment without prior notice.',
    },
    {
      title: '5. Table & Tasting Reservations',
      content:
        'Reservations for our dedicated slow bar tasting salon require confirmation through our reservation portal or staff. We hold reserved tables for up to 15 minutes past the scheduled arrival time before releasing the seating to walk-in patrons.',
    },
    {
      title: '6. Cancellations & Modifications',
      content:
        'For special tasting flights and private salon bookings, please provide at least 24 hours advance notice for cancellations or guest count adjustments. Deposit refunds for specialized masterclasses are subject to specific event tier policies.',
    },
    {
      title: '7. Intellectual Property',
      content:
        'All branding, trademarks, original photography, editorial essays, and graphical layouts featured on this website are the proprietary property of Aurelia and protected under United States and international intellectual property laws.',
    },
    {
      title: '8. User Responsibilities',
      content:
        'When submitting inquiries, reviews, or reservation notes, you warrant that the information provided is accurate and does not violate any third-party rights or applicable regulations.',
    },
    {
      title: '9. Third-Party Links & Integrations',
      content:
        'Our digital platform may reference external services, including map navigation and social media platforms. Aurelia assumes no responsibility for the content, privacy protocols, or practices of third-party websites.',
    },
    {
      title: '10. Limitation of Liability',
      content:
        'To the maximum extent permitted under applicable law, Aurelia shall not be liable for indirect, incidental, or consequential damages resulting from your use of, or inability to access, our website or premises.',
    },
    {
      title: '11. Changes to Terms',
      content:
        'We reserve the right to modify these Terms at any time. Continued use of our digital platforms following changes signifies your acceptance of the revised Terms.',
    },
    {
      title: '12. Governing Law',
      content:
        'These Terms and any disputes arising under them shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.',
    },
    {
      title: '13. Contact Information',
      content: `Questions regarding these Terms should be directed to our administrative desk at ${CAFE_INFO.email} or by mail to ${CAFE_INFO.address.full}.`,
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen pt-28 pb-28 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-caramel-400 mb-4 px-3 py-1 rounded-full bg-caramel-500/10 border border-caramel-500/20">
          <FileText className="w-3.5 h-3.5" />
          <span>Policies &bull; Updated September 2026</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm md:text-base text-cream-300/70 font-sans max-w-xl mx-auto">
          The principles and guidelines that govern our digital platform and slow bar experience.
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-8">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="terms-section glass-card p-6 sm:p-8 rounded-2xl border border-cream-300/10"
          >
            <h2 className="font-serif text-xl sm:text-2xl text-cream-100 font-medium mb-3">
              {sec.title}
            </h2>
            <p className="text-xs sm:text-sm text-cream-300/80 font-sans leading-relaxed">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsConditions;
