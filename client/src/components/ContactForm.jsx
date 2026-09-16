import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { submitContactForm } from '../services/api';
import { createMagnetic } from '../animations/magnetic';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const successBoxRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    if (submitBtnRef.current) {
      const cleanup = createMagnetic(submitBtnRef.current, { strength: 0.25 });
      return cleanup;
    }
  }, [status.success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      await submitContactForm(formData);
      setStatus({ submitting: false, success: true, error: null });

      // Animate success badge with GSAP
      setTimeout(() => {
        if (successBoxRef.current) {
          gsap.fromTo(
            successBoxRef.current,
            { scale: 0.8, opacity: 0, y: 25 },
            { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)' }
          );
        }
      }, 50);

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="relative w-full rounded-2xl glass-card p-8 sm:p-12 border border-cream-300/10 shadow-2xl">
      {status.success ? (
        <div
          ref={successBoxRef}
          className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-3xl text-cream-100 font-light">
            Inquiry Transmitted
          </h3>
          <p className="text-sm text-cream-300/70 max-w-md font-sans leading-relaxed">
            Thank you for reaching out to PINCOF Hospitality Group. Our executive relations team will review your inquiry and connect within 24–48 hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus({ submitting: false, success: false, error: null })}
            className="mt-6 px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest bg-espresso-800 text-cream-100 hover:bg-espresso-700 transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {status.error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-sm font-sans">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@organization.com"
                className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Number (Optional) */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
                Phone Number <span className="text-cream-400/40 text-[10px] lowercase">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors"
              />
            </div>

            {/* Subject / Topic */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="subject" className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
                Inquiry Topic <span className="text-red-400">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-caramel-400 transition-colors"
              >
                <option value="" disabled>Select corporate topic...</option>
                <option value="Franchise & Operator Expansion">Franchise &amp; Operator Expansion</option>
                <option value="Real Estate & Prime Locations">Real Estate &amp; Prime Locations</option>
                <option value="Brand Development & Partnerships">Brand Development &amp; Partnerships</option>
                <option value="Roastery Supply & Green Coffee">Roastery Supply &amp; Green Coffee</option>
                <option value="Press & Corporate Relations">Press &amp; Corporate Relations</option>
                <option value="General Corporate Inquiry">General Corporate Inquiry</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="message" className="text-xs uppercase font-sans tracking-widest text-caramel-300 font-medium">
              Your Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your organization, proposed territory, or inquiry details..."
              className="w-full bg-espresso-950/70 border border-cream-300/15 rounded-xl px-4 py-3 text-sm text-cream-100 placeholder:text-cream-400/30 focus:outline-none focus:border-caramel-400 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            ref={submitBtnRef}
            data-cursor="open"
            type="submit"
            disabled={status.submitting}
            className="w-full py-4 rounded-full bg-caramel-500 text-espresso-950 font-sans text-sm font-semibold tracking-widest uppercase hover:bg-caramel-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-caramel-500/20 disabled:opacity-50 select-none will-change-transform"
          >
            {status.submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting To HQ...</span>
              </>
            ) : (
              <>
                <span>Transmit Corporate Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
