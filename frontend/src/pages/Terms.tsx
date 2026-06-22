import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';
import { Mail, Calendar, Shield, BookOpen, Scale, AlertTriangle } from 'lucide-react';

export default function Terms() {
  useEffect(() => {
    trackPageView('/terms');
  }, []);

  return (
    <>
      <SEO title="Terms of Service | Quiet Psychology" description="Terms of service for Quiet Psychology." pathname="/terms" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Terms of Service" align="center" />

          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-4 text-xs text-body">
            <span className="flex items-center gap-1.5 surface-glass px-3 py-1.5">
              <Calendar size={12} className="text-soft-gold" /> Last Updated: June 2026
            </span>
          </div>

          <div className="space-y-10 md:space-y-12 text-body leading-relaxed">
            <p className="text-lg">
              Welcome to Quiet Psychology. By accessing or using this website, you agree to be bound by these Terms of Service.
            </p>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Eligibility</h2>
              </div>
              <p>You must be at least 18 years old to purchase products from this website.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Intellectual Property</h2>
              </div>
              <p>
                All content available through Quiet Psychology, including ebooks, guides, text, graphics, branding, and digital materials, is protected by copyright and intellectual property laws.
              </p>
              <p className="mt-3">Purchasing a product grants a personal, non-transferable license to use the product.</p>
              <p className="mt-4 mb-2">Customers may not:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Resell products.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Redistribute products.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Share download links.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Upload products to public websites.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Modify and sell derivative versions.
                </li>
              </ul>
            </div>

            <div className="surface-card p-6 md:p-8 border-l-4 border-soft-gold">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Educational Purpose Only</h2>
              </div>
              <p>Quiet Psychology products are provided solely for educational and informational purposes.</p>
              <p className="mt-3 mb-2">They do not constitute:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Medical advice</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Psychological treatment</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Therapy</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Clinical diagnosis</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Legal advice</li>
              </ul>
              <p className="mt-3">Users should seek qualified professionals for professional assistance.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Product Availability</h2>
              </div>
              <p>We reserve the right to modify, discontinue, or update products at any time without prior notice.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Limitation of Liability</h2>
              <p className="mb-2">To the fullest extent permitted by law, Quiet Psychology shall not be liable for:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Indirect damages</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Consequential damages</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Lost profits</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Emotional distress</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Relationship outcomes</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Personal decisions made based on product content</li>
              </ul>
              <p className="mt-3">Use of the products is entirely at the customer's own discretion.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Governing Terms</h2>
              <p>Quiet Psychology reserves the right to update these Terms of Service at any time.</p>
              <p className="mt-3">Continued use of the website constitutes acceptance of the updated terms.</p>
            </div>

            <div className="surface-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-soft-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-soft-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-heading mb-2">Contact</h2>
                  <a href="mailto:support@quietpsychology.com" className="text-soft-gold hover:underline font-medium">
                    support@quietpsychology.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
