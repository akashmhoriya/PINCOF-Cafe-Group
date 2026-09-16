import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck } from 'lucide-react';

import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CAFE_INFO } from '../data/cafeInfo';

export const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy', 'Review the Privacy Policy for Aurelia Specialty Coffee Roasters.');

  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.querySelectorAll('.policy-section'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, []);

  const sections = [
    {
      title: '1. Introduction',
      content:
        'At Aurelia Specialty Coffee Roasters ("Aurelia," "we," "our," or "us"), we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy governs your use of our website, table reservation systems, digital newsletters, and in-café Wi-Fi guest portals.',
    },
    {
      title: '2. Information We Collect',
      content:
        'We collect information that you voluntarily provide to us when contacting us, reserving a slow bar table, or joining our Morning Bulletin newsletter. This includes your name, email address, telephone number, reservation details, and any tasting preferences submitted through our forms. We also automatically collect standard technical data such as browser type, IP address, and pages visited.',
    },
    {
      title: '3. How We Use Information',
      content:
        'Your data is utilized strictly to provide exceptional hospitality: processing table reservations, communicating regarding special events, fulfilling micro-lot coffee orders, improving our digital platform, and dispatching curated editorial publications when you explicitly opt in.',
    },
    {
      title: '4. Cookies & Tracking Technologies',
      content:
        'We use small session and persistent cookies to remember your device preferences (such as dietary filter preferences and session state). You may manage or disable cookies at any time via your browser settings, though certain visual enhancements may be limited.',
    },
    {
      title: '5. Analytics & Performance',
      content:
        'We may use privacy-respecting analytics tools to evaluate foot traffic trends, peak digital visitation hours, and menu engagement. These analytics aggregate non-identifiable metrics and are never sold or rented to third-party data brokers.',
    },
    {
      title: '6. Third-Party Services',
      content:
        'We collaborate with trusted service providers to support our operations (e.g., database hosting, payment gateways, and map direction routing via Google Maps Platform). These third parties process data solely on our behalf under strict confidentiality agreements.',
    },
    {
      title: '7. Data Security',
      content:
        'We deploy robust industry-standard encryption protocols (TLS/SSL), segregated database access controls, and regular vulnerability audits to safeguard your personal credentials against unauthorized access, disclosure, or alteration.',
    },
    {
      title: '8. Data Retention',
      content:
        'We retain personal information only for the period necessary to fulfill the purposes outlined in this policy, unless a longer retention window is mandated or permitted by applicable state or federal law.',
    },
    {
      title: '9. Your Rights & Choices',
      content:
        'Depending on your jurisdiction (such as California CCPA/CPRA), you have the right to access, correct, export, or request deletion of your personal data held by Aurelia. You may also unsubscribe from marketing dispatches with a single click at any time.',
    },
    {
      title: "10. Children's Privacy",
      content:
        'Our website and commercial services are not directed toward children under 13 years of age. We do not knowingly collect or solicit personal information from minors.',
    },
    {
      title: '11. Policy Updates',
      content:
        'We may update this Privacy Policy periodically to reflect changes in our hospitality operations or legal requirements. The updated date at the top of this document indicates the most recent revision.',
    },
    {
      title: '12. Contact Information',
      content: `For privacy-related inquiries or to exercise your statutory rights, please contact our Data Privacy Officer at ${CAFE_INFO.email} or by post at ${CAFE_INFO.address.full}.`,
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen pt-28 pb-28 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-caramel-400 mb-4 px-3 py-1 rounded-full bg-caramel-500/10 border border-caramel-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal &bull; Updated September 2026</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 font-light tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm md:text-base text-cream-300/70 font-sans max-w-xl mx-auto">
          How Aurelia Specialty Coffee Roasters gathers, honors, and protects your personal information.
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-8">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="policy-section glass-card p-6 sm:p-8 rounded-2xl border border-cream-300/10"
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

export default PrivacyPolicy;
