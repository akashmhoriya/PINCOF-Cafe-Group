import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Bean, Droplets, Users, Compass, Building2, TrendingUp } from 'lucide-react';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PINCOF_INFO } from '../data/pincofInfo';
import { TIMELINE_EVENTS } from '../data/timeline';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  useDocumentTitle(
    'About PINCOF | Café & Coffee Brands Group',
    'PINCOF develops, operates, and grows distinctive café and coffee concepts for communities worldwide.'
  );

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const editorialImageRef = useRef(null);
  const storytellingRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);

  const storyPillars = [
    {
      step: '01',
      icon: Bean,
      category: 'Coffee',
      title: 'Terroir & Science',
      subtitle: 'Micro-Lot Green Coffee',
      description:
        'Direct-trade micro-lot green beans sourced above 1,700m in Yirgacheffe and Huila, roasted on clean electric fluid-bed profiles, ensuring uncompromised cup quality across every concept in the group.',
      quote: 'Respect the harvest, honor the terroir.',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=85',
    },
    {
      step: '02',
      icon: Compass,
      category: 'Experience',
      title: 'Atmospheric Calm',
      subtitle: 'Architectural Sanctum',
      description:
        'Every brand features bespoke interior architecture, acoustic calibration, custom lighting, and dedicated hospitality designed for contemplation, work, and community gatherings.',
      quote: 'Spaces designed to slow time and inspire connection.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
    },
    {
      step: '03',
      icon: Users,
      category: 'Brand',
      title: 'Cultural Resonance',
      subtitle: 'Narrative Identities',
      description:
        'We build cohesive, narrative-rich identities that speak directly to contemporary lifestyle sensibilities—from Nordic minimalism to living botanical conservatories and European bakery hearths.',
      quote: 'Authentic concepts that become neighborhood landmarks.',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
    },
    {
      step: '04',
      icon: TrendingUp,
      category: 'Growth',
      title: 'Scalable Excellence',
      subtitle: 'Franchise & Operator Platform',
      description:
        'Comprehensive operator playbooks, supply chain logistics, turnkey architectural blueprints, and centralized training academies empowering our franchise partners to succeed.',
      quote: 'Unit economics paired with craftsmanship.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.about-fade-up, .timeline-card, .story-chapter-text, .story-chapter-img', {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Hero Entrance with Word Convergence
      const heroWords = heroRef.current?.querySelectorAll('.about-hero-word');
      if (heroWords) {
        gsap.fromTo(
          heroWords,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      }

      // 2. Editorial Mask Reveal
      if (editorialImageRef.current) {
        gsap.fromTo(
          editorialImageRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.15 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 1.6,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: editorialImageRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // 3. Desktop Pinned Storytelling 4-Chapter Sequence
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          if (!storytellingRef.current) return;

          const textChapters = storytellingRef.current.querySelectorAll('.story-chapter-text');
          const imgChapters = storytellingRef.current.querySelectorAll('.story-chapter-img');
          const stepIndicators = storytellingRef.current.querySelectorAll('.chapter-step-pill');

          const storyTl = gsap.timeline({
            scrollTrigger: {
              trigger: storytellingRef.current,
              pin: true,
              scrub: 1.2,
              start: 'top top',
              end: '+=320%',
              anticipatePin: 1,
            },
          });

          // Initially show chapter 0
          gsap.set(textChapters[0], { opacity: 1, y: 0 });
          gsap.set(imgChapters[0], { opacity: 1, scale: 1 });
          gsap.set(stepIndicators[0], { borderColor: '#c88949', color: '#c88949', scale: 1.05 });

          // Transition through chapters 1, 2, 3
          for (let i = 1; i < textChapters.length; i++) {
            const prev = i - 1;
            const cur = i;

            // Fade out previous chapter
            storyTl.to(
              textChapters[prev],
              { opacity: 0, y: -25, duration: 0.6, ease: 'power2.in' },
              `step${cur}`
            );
            storyTl.to(
              imgChapters[prev],
              { opacity: 0, scale: 1.06, duration: 0.8, ease: 'power2.inOut' },
              `step${cur}`
            );
            storyTl.to(
              stepIndicators[prev],
              { borderColor: 'rgba(237, 229, 216, 0.1)', color: 'rgba(237, 229, 216, 0.4)', scale: 1, duration: 0.4 },
              `step${cur}`
            );

            // Fade in current chapter
            storyTl.fromTo(
              textChapters[cur],
              { opacity: 0, y: 35 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
              `step${cur}+=0.3`
            );
            storyTl.fromTo(
              imgChapters[cur],
              { opacity: 0, scale: 0.96, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
              { opacity: 1, scale: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1, ease: 'power3.inOut' },
              `step${cur}+=0.2`
            );
            storyTl.to(
              stepIndicators[cur],
              { borderColor: '#c88949', color: '#c88949', scale: 1.05, duration: 0.4 },
              `step${cur}+=0.3`
            );
          }
        },
      });

      // 4. Timeline Spine Line Draw & Cards Stagger
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 1,
            },
          }
        );
      }

      const timelineCards = timelineRef.current?.querySelectorAll('.timeline-card');
      if (timelineCards) {
        timelineCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-28 pb-28">
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
          <span>The PINCOF Group</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream-100 tracking-tight leading-[1.08] mb-8 select-none">
          <span className="block overflow-hidden pb-1">
            <span className="about-hero-word inline-block mr-3 sm:mr-4">More</span>
            <span className="about-hero-word inline-block">Than</span>
          </span>
          <span className="block overflow-hidden">
            <span className="about-hero-word inline-block italic text-caramel-300 font-serif">
              A Single Café.
            </span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-300/80 font-sans font-light leading-relaxed">
          {PINCOF_INFO.subheading}
        </p>
      </section>

      {/* 2. GROUP PHILOSOPHY — EDITORIAL FEATURE */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-7">
            <div
              ref={editorialImageRef}
              data-cursor="view"
              className="relative rounded-2xl overflow-hidden border border-cream-300/10 shadow-2xl h-[420px] sm:h-[520px] cursor-pointer will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
                alt="PINCOF Specialty Roastery & Headquarters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-caramel-400 font-sans">
                  Corporate Headquarters &bull; San Francisco, CA
                </span>
                <h3 className="font-serif text-2xl text-cream-100 mt-1">
                  PINCOF Hospitality &amp; Café Brands Group
                </h3>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-caramel-400 font-semibold">
              The Parent Company Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light leading-snug">
              One Vision. <br />
              <span className="italic text-caramel-300">A World of Experiences.</span>
            </h2>
            <p className="text-sm sm:text-base text-cream-300/80 font-sans font-light leading-relaxed">
              PINCOF was founded on a singular conviction: that modern café culture thrives when independent, high-character concepts are backed by the operational rigor, equipment standards, and direct-trade sourcing of a dedicated parent group.
            </p>
            <p className="text-sm sm:text-base text-cream-300/80 font-sans font-light leading-relaxed">
              Rather than standardizing one cookie-cutter chain, PINCOF conceives distinctive concepts tailored for different moments of the day: slow bars for deep reflection, minimalist espresso labs for urban momentum, botanical conservatories for wellbeing, and heritage bakery hearths for morning comfort.
            </p>
            <div className="pt-2">
              <div className="flex items-center gap-3 text-caramel-300 font-serif italic text-lg">
                <Heart className="w-5 h-5 text-caramel-400" />
                <span>"Coffee. Culture. Community. Growth."</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PINNED 4-PILLAR CORPORATE CHAPTERS (DESKTOP PIN / MOBILE STACK) */}
      <section
        ref={storytellingRef}
        className="relative py-24 lg:py-0 lg:h-screen bg-[#0e0805] border-y border-espresso-800/80 mb-32 overflow-hidden flex items-center"
      >
        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-caramel-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          {/* Desktop Pinned Dual Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-16 items-center min-h-[580px]">
            {/* Left Column: Pinned Text Container */}
            <div className="col-span-5 relative h-[480px] flex flex-col justify-between">
              {/* Chapter Indicator Pills */}
              <div className="flex items-center space-x-2">
                {storyPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="chapter-step-pill px-3 py-1 rounded-full border border-cream-300/15 text-[10px] uppercase font-sans tracking-widest text-cream-300/40 transition-all duration-300"
                  >
                    {pillar.step}. {pillar.category}
                  </div>
                ))}
              </div>

              {/* Dynamic Text Slots */}
              <div className="relative flex-grow mt-8">
                {storyPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className={`story-chapter-text absolute inset-0 flex flex-col justify-center will-change-transform ${
                        idx === 0 ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-caramel-400 mb-3">
                        <Icon className="w-5 h-5" />
                        <span className="text-xs uppercase font-sans tracking-[0.25em] font-semibold">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 font-light mb-6">
                        {pillar.title}
                      </h2>
                      <p className="text-base text-cream-300/80 font-sans leading-relaxed font-light mb-6">
                        {pillar.description}
                      </p>
                      <div className="pt-4 border-t border-espresso-800/80 flex items-center gap-3 text-caramel-300 italic font-serif text-lg">
                        <span>"{pillar.quote}"</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual Chapter Frame */}
            <div className="col-span-7 relative h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-cream-300/15 bg-espresso-950">
              {storyPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  data-cursor="view"
                  className={`story-chapter-img absolute inset-0 will-change-transform ${
                    idx === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-black/20" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-cream-200">
                    <span className="tracking-widest uppercase text-caramel-400 font-medium">
                      Pillar {pillar.step} &bull; {pillar.category}
                    </span>
                    <span className="opacity-70 font-mono">PINCOF Standard</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Responsive Fallback Stack */}
          <div className="lg:hidden space-y-12">
            <SectionHeading
              badge="The Four Pillars"
              title="The PINCOF Standard."
              subtitle="Four core pillars guiding every espresso pulled, brand created, and partnership forged."
              className="mb-10 text-left"
            />
            {storyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-card overflow-hidden border border-cream-300/10 flex flex-col"
                >
                  <div className="h-56 relative overflow-hidden bg-espresso-900">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-espresso-950/40" />
                    <span className="absolute top-4 left-4 text-[10px] uppercase font-sans tracking-widest px-3 py-1 rounded-full bg-espresso-950/80 text-caramel-400 border border-caramel-500/20">
                      {pillar.step} &bull; {pillar.category}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-caramel-400 mb-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] uppercase font-sans tracking-widest font-semibold">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-cream-100 font-medium mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-cream-300/70 font-sans leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <p className="text-xs text-caramel-300 font-serif italic border-t border-espresso-800/80 pt-3">
                      "{pillar.quote}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ANIMATED TIMELINE SECTION */}
      <section
        ref={timelineRef}
        className="px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto mb-32"
      >
        <SectionHeading
          badge="Milestones"
          title="The Evolution of Our Group."
          subtitle="From green coffee contracts and a single flagship roastery to a worldwide portfolio of distinctive café concepts."
          className="mb-20"
        />

        <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-16">
          {/* Animated Connecting Vertical Spine */}
          <div
            ref={timelineLineRef}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-caramel-400 via-amber-200 to-caramel-600 origin-top will-change-transform"
          />

          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="timeline-card relative group will-change-transform">
              {/* Year Marker Bead */}
              <div className="absolute -left-[31px] sm:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-caramel-500 border-4 border-[#140c08] shadow-[0_0_14px_rgba(200,137,73,0.8)] transition-transform group-hover:scale-125" />

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start glass-card p-6 sm:p-8 rounded-2xl border border-cream-300/10 transition-colors group-hover:border-caramel-500/30">
                <div className="lg:w-1/3 w-full h-44 rounded-xl overflow-hidden bg-espresso-900 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-serif text-3xl sm:text-4xl text-caramel-400 font-light">
                        {event.year}
                      </span>
                      <span className="text-xs uppercase font-sans tracking-widest text-cream-300/60 font-medium">
                        {event.subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-cream-100 font-normal mb-3">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cream-300/80 font-sans leading-relaxed mb-4">
                      {event.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-sans text-caramel-300 bg-caramel-500/10 px-3 py-1.5 rounded-lg border border-caramel-500/20 w-fit">
                    <Sparkles className="w-3 h-3 text-caramel-400" />
                    <span>{event.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CORPORATE STATEMENT */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto text-center pt-8">
        <div className="p-12 sm:p-16 rounded-3xl glass-card border border-caramel-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-6 block">
            Partner With PINCOF
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream-100 font-light leading-tight mb-8">
            "Building brands that brew <br />
            <span className="italic text-caramel-300">enduring culture."</span>
          </h2>
          <p className="text-sm sm:text-base text-cream-300/70 font-sans max-w-xl mx-auto leading-relaxed mb-8">
            Whether you are an ambitious operator seeking a franchise license, an artisan looking to join our roasteries, or a developer with prime real estate, we invite you into the PINCOF story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/franchise" variant="primary" size="lg" showArrow={true}>
              Franchise Opportunities
            </Button>
            <Button to="/brands" variant="outline" size="lg">
              Explore Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
