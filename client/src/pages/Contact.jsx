import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Building2, Briefcase } from 'lucide-react';
import gsap from 'gsap';
import { Instagram, Facebook, Twitter } from '../components/Icons';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PINCOF_INFO } from '../data/pincofInfo';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';

export const Contact = () => {
  useDocumentTitle(
    'Contact Corporate | PINCOF Café & Coffee Group',
    'Contact PINCOF Corporate Headquarters in San Francisco. Connect regarding franchise partnerships, real estate submissions, and brand alliances.'
  );

  const containerRef = useRef(null);
  const leftCardsRef = useRef(null);
  const formWrapperRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        '.contact-header-badge, .contact-header-title, .contact-header-sub',
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      )
      .fromTo(
        leftCardsRef.current?.children,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        formWrapperRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <SectionHeading
          badge="Corporate Inquiries &amp; Headquarters"
          title="Connect With Our Group."
          subtitle="Reach our executive team for franchise partnership evaluations, prime real estate submissions, coffee roastery supply, and press relations."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Headquarters Details, Hours, Emails */}
        <div ref={leftCardsRef} className="lg:col-span-5 space-y-8">
          {/* Corporate Headquarters Card */}
          <div className="glass-card p-8 rounded-2xl border border-cream-300/10 space-y-6">
            <div className="border-b border-espresso-800 pb-4">
              <span className="text-xs uppercase font-sans tracking-widest text-caramel-400 font-semibold block mb-1">
                Parent Company
              </span>
              <h3 className="font-serif text-2xl text-cream-100 font-medium">
                PINCOF Hospitality Group
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  Global Headquarters
                </span>
                <p className="text-cream-100 font-medium">{PINCOF_INFO.headquarters.street}</p>
                <p className="text-cream-300/70 text-xs">{PINCOF_INFO.headquarters.district}</p>
                <p className="text-cream-300/70 text-xs">
                  {PINCOF_INFO.headquarters.city}, {PINCOF_INFO.headquarters.state} {PINCOF_INFO.headquarters.zip}
                </p>
                <span className="text-cream-400/50 text-[11px] block mt-1">
                  {PINCOF_INFO.headquarters.country}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  HQ Telephone
                </span>
                <a
                  href={`tel:${PINCOF_INFO.phone}`}
                  className="text-cream-100 hover:text-caramel-400 transition-colors font-medium"
                >
                  {PINCOF_INFO.phone}
                </a>
              </div>
            </div>

            {/* Corporate Department Emails */}
            <div className="flex items-start gap-4 text-sm font-sans">
              <div className="p-2.5 rounded-full bg-caramel-500/10 text-caramel-400 border border-caramel-500/20 flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-xs uppercase font-sans tracking-widest text-caramel-400/80 mb-1">
                  Department Inquiries
                </span>
                <div>
                  <span className="text-[11px] text-cream-400/60 block">Franchise &amp; Operators:</span>
                  <a
                    href={`mailto:${PINCOF_INFO.franchiseEmail}`}
                    className="text-cream-100 hover:text-caramel-400 transition-colors font-medium text-xs"
                  >
                    {PINCOF_INFO.franchiseEmail}
                  </a>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] text-cream-400/60 block">Partners &amp; Real Estate:</span>
                  <a
                    href={`mailto:${PINCOF_INFO.partnersEmail}`}
                    className="text-cream-100 hover:text-caramel-400 transition-colors font-medium text-xs"
                  >
                    {PINCOF_INFO.partnersEmail}
                  </a>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] text-cream-400/60 block">General Corporate:</span>
                  <a
                    href={`mailto:${PINCOF_INFO.email}`}
                    className="text-cream-100 hover:text-caramel-400 transition-colors font-medium text-xs"
                  >
                    {PINCOF_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="glass-card p-8 rounded-2xl border border-cream-300/10">
            <div className="flex items-center gap-3 mb-6 border-b border-espresso-800 pb-4">
              <Clock className="w-5 h-5 text-caramel-400" />
              <h3 className="font-serif text-2xl text-cream-100 font-medium">
                HQ Office Hours
              </h3>
            </div>

            <div className="space-y-4">
              {PINCOF_INFO.hours.map((schedule, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-sans">
                  <div>
                    <span className="text-cream-100 font-medium block">{schedule.days}</span>
                    <span className="text-cream-400/50 text-[11px]">{schedule.notes}</span>
                  </div>
                  <span className="text-caramel-300 font-semibold">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Follow */}
          <div className="glass-card p-6 rounded-2xl border border-cream-300/10 flex items-center justify-between">
            <span className="text-xs uppercase font-sans tracking-widest text-caramel-400 font-medium">
              Connect With Group
            </span>
            <div className="flex items-center gap-3">
              <a
                href={PINCOF_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="p-2.5 rounded-full bg-espresso-800 text-cream-200 hover:text-caramel-400 hover:bg-espresso-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={PINCOF_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="p-2.5 rounded-full bg-espresso-800 text-cream-200 hover:text-caramel-400 hover:bg-espresso-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Corporate Inquiry Form */}
        <div ref={formWrapperRef} className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
