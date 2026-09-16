import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Building2,
  Coffee,
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  Send,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { submitFranchiseApplication, getBrands } from '../services/api';
import { FALLBACK_BRANDS } from '../data/fallbackBrands';
import { PINCOF_INFO } from '../data/pincofInfo';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export const Franchise = () => {
  useDocumentTitle(
    'Franchise & Partner Opportunities | PINCOF Café & Coffee Group',
    'Partner with PINCOF to launch and operate premier café concepts in your market. Comprehensive turnkey support from architecture to bean supply.'
  );

  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';

  const [brands, setBrands] = useState(FALLBACK_BRANDS);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    investmentRange: '$300,000 — $600,000',
    preferredBrand: initialBrand || 'Aurelia Slow Bar & Roastery',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const formSectionRef = useRef(null);

  // Load available brands
  useEffect(() => {
    let isMounted = true;
    const loadBrands = async () => {
      try {
        const fetched = await getBrands();
        if (isMounted && fetched && fetched.length > 0) {
          setBrands(fetched);
          if (initialBrand) {
            const matched = fetched.find((b) => b.slug === initialBrand);
            if (matched) {
              setFormData((prev) => ({ ...prev, preferredBrand: matched.name }));
            }
          }
        }
      } catch (err) {
        // Fallback already in place
      }
    };
    loadBrands();
    return () => {
      isMounted = false;
    };
  }, [initialBrand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await submitFranchiseApplication(formData);
      if (response && response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          country: '',
          investmentRange: '$300,000 — $600,000',
          preferredBrand: brands[0]?.name || 'Aurelia Slow Bar & Roastery',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(response?.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(
        err.response?.data?.message || err.message || 'An unexpected error occurred. Please contact franchise@pincof.com directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      number: '01',
      title: 'Concept Discovery',
      description: 'Explore the PINCOF portfolio and select the café concept best aligned with your local demographic and foot traffic.',
    },
    {
      number: '02',
      title: 'Qualification & Application',
      description: 'Submit your operator profile and financial capabilities for territory reservation review by our corporate committee.',
    },
    {
      number: '03',
      title: 'Executive Cupping & Align',
      description: 'Meet the PINCOF leadership team at our San Francisco Headquarters for coffee sensory calibration and brand alignment.',
    },
    {
      number: '04',
      title: 'Site Selection & Architecture',
      description: 'Our design studio delivers complete architectural CAD blueprints, lighting specs, acoustic planning, and equipment layouts.',
    },
    {
      number: '05',
      title: 'Academy & Grand Opening',
      description: 'Comprehensive 4-week barista training, supplier integration, supply chain onboarding, and a curated launch campaign.',
    },
    {
      number: '06',
      title: 'Growth & Seasonal Menus',
      description: 'Ongoing access to direct-trade roasts, quarterly signature drink recipes, operational audits, and marketing support.',
    },
  ];

  const faqs = [
    {
      question: 'What territory exclusivity does PINCOF grant?',
      answer: 'We grant protected territory radii based on population density and trade area foot traffic (typically 1.5 to 3 miles in dense metropolitan centers) to safeguard our franchise operators.',
    },
    {
      question: 'What initial capital is required to open a PINCOF café?',
      answer: 'Total investment ranges between $250,000 and $750,000 depending on the concept footprint, municipal permitting, and equipment selection (e.g. Modbar undercounter systems vs. La Marzocco Strada).',
    },
    {
      question: 'Do I need direct specialty coffee or hospitality experience?',
      answer: 'While prior operational or multi-unit hospitality experience is advantageous, it is not mandatory. Our intensive PINCOF Training Academy covers extraction science, sensory calibration, inventory management, and guest hospitality.',
    },
    {
      question: 'How is green and roasted coffee supplied to locations?',
      answer: 'All coffee is roasted and distributed through our centralized roasteries, ensuring identical world-class cup profiles and direct-trade farm provenance across all locations globally.',
    },
    {
      question: 'Can I franchise multiple PINCOF concepts in one city?',
      answer: 'Yes. Several of our leading multi-unit partners operate both an Aurelia Slow Bar in commercial hubs and Kanso Espresso Labs in high-density transit corridors.',
    },
  ];

  return (
    <div className="relative w-full min-h-screen pt-28 pb-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-caramel-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-8 pb-20">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-caramel-400 mb-6 px-4 py-1.5 rounded-full bg-caramel-500/10 border border-caramel-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-caramel-400 animate-pulse" />
          <span>Global Franchise &amp; Partner Program</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-100 font-light tracking-tight max-w-5xl mx-auto leading-[1.08]">
          Expand With PINCOF.{' '}
          <span className="italic text-caramel-300 font-serif block sm:inline">
            Brewing Capital &amp; Culture.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-cream-200/80 font-sans font-light leading-relaxed">
          PINCOF develops and scales high-performance café concepts with distinctive design, direct-trade coffee integrity, and exceptional unit economics. Join us as an operating partner.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => {
              formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="primary"
            size="lg"
            showArrow={true}
          >
            Apply for Territory
          </Button>
          <Button to="/brands" variant="outline" size="lg">
            Review Portfolio Brands
          </Button>
        </div>
      </div>

      {/* 2. THE PINCOF ADVANTAGE (WHY US) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
            The Operator Platform
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
            Engineered for Operator Success.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-2xl bg-[#170e09] border border-espresso-800/80">
            <Building2 className="w-8 h-8 text-caramel-400 mb-6" />
            <h3 className="font-serif text-xl text-cream-100 mb-3">Turnkey Architecture</h3>
            <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
              Complete CAD layouts, acoustic design guidelines, custom millwork specs, and turnkey lighting packages tailored to each space.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#170e09] border border-espresso-800/80">
            <Coffee className="w-8 h-8 text-caramel-400 mb-6" />
            <h3 className="font-serif text-xl text-cream-100 mb-3">Direct-Trade Supply</h3>
            <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
              Proprietary single-origin lots and custom espresso roast profiles distributed with guaranteed cup freshness and stable pricing.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#170e09] border border-espresso-800/80">
            <Award className="w-8 h-8 text-caramel-400 mb-6" />
            <h3 className="font-serif text-xl text-cream-100 mb-3">Operator Academy</h3>
            <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
              Rigorous 4-week training curriculum for lead baristas, general managers, and shift supervisors covering extraction science and hospitality.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#170e09] border border-espresso-800/80">
            <TrendingUp className="w-8 h-8 text-caramel-400 mb-6" />
            <h3 className="font-serif text-xl text-cream-100 mb-3">Robust Unit Economics</h3>
            <p className="text-xs sm:text-sm text-cream-300/70 font-sans leading-relaxed">
              Streamlined labor matrices, POS integrations, inventory automation, and proven margin profiles across coffee, food, and merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SIX-STEP TIMELINE PROCESS */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#100906] border-y border-espresso-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-3 block">
              The Path to Launch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
              Our 6-Step Partnership Journey.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-espresso-950/60 border border-espresso-800/80 flex flex-col justify-between group hover:border-caramel-500/40 transition-colors"
              >
                <div>
                  <span className="font-serif text-4xl text-caramel-400/40 group-hover:text-caramel-400 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl text-cream-100 mt-4 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-cream-300/70 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE APPLICATION FORM */}
      <section
        ref={formSectionRef}
        id="apply"
        className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto"
      >
        <div className="rounded-3xl p-8 sm:p-14 bg-[#180e09] border border-espresso-800/80 shadow-2xl relative">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-2 block">
              Application Portal
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-light">
              Submit Operator Application.
            </h2>
            <p className="text-sm sm:text-base text-cream-300/70 mt-3 font-sans max-w-xl mx-auto">
              Please provide your information and target territory details. Our franchise development director will review and schedule an introductory briefing within 48 hours.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <h4 className="font-serif text-xl text-cream-100 mb-2">
                Application Received Successfully
              </h4>
              <p className="text-sm text-emerald-200/90 font-sans">
                Thank you for your interest in partnering with PINCOF. An executive from our Franchise Development Committee will contact you shortly.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-center text-sm text-red-200 font-sans">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jonathan Vance"
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Target City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Seattle"
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. United States"
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Target Brand Concept
                </label>
                <select
                  name="preferredBrand"
                  value={formData.preferredBrand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                >
                  {brands.map((b) => (
                    <option key={b.slug || b._id} value={b.name}>
                      {b.name} ({b.category})
                    </option>
                  ))}
                  <option value="Open to Recommendation">Open to Recommendation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                  Investment Capital Range
                </label>
                <select
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 focus:outline-none focus:border-caramel-400 transition-colors text-sm"
                >
                  <option value="$150,000 — $300,000">$150,000 — $300,000</option>
                  <option value="$300,000 — $600,000">$300,000 — $600,000</option>
                  <option value="$600,000 — $1,200,000">$600,000 — $1,200,000</option>
                  <option value="$1,200,000+">$1,200,000+ (Multi-Unit)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans text-cream-300/80 mb-2">
                Operator Background &amp; Vision
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your background, existing hospitality portfolio, target real estate or neighborhood..."
                className="w-full px-4 py-3 rounded-xl bg-espresso-950/80 border border-espresso-700/60 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors text-sm resize-none"
              />
            </div>

            <div className="pt-4 text-center">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full sm:w-auto min-w-[240px] justify-center"
              >
                {submitting ? 'Submitting Application...' : 'Submit Partnership Application'}
              </Button>
              <p className="mt-4 text-[11px] font-sans text-cream-400/50">
                All submissions are held in strict commercial confidence by PINCOF Hospitality Group Inc.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-sans tracking-[0.3em] text-caramel-400 font-semibold mb-2 block">
            Clarity &amp; Terms
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream-100 font-light">
            Franchise Inquiries FAQ.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-espresso-950/60 border border-espresso-800/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-caramel-400 transition-colors"
              >
                <span className="font-serif text-lg sm:text-xl text-cream-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-caramel-400 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 pt-0 text-sm text-cream-300/75 font-sans leading-relaxed border-t border-espresso-800/50 mt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Franchise;
