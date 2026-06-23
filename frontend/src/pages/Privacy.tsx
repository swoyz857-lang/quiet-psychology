import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';
import { Mail, Calendar, Shield, Cookie, Eye, Globe, Lock, Server } from 'lucide-react';

export default function Privacy() {
  useEffect(() => {
    trackPageView('/privacy');
  }, []);

  return (
    <>
      <SEO title="Privacy Policy | Quiet Psychology" description="Privacy policy for Quiet Psychology." pathname="/privacy" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Privacy Policy" align="center" />

          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-4 text-xs text-body">
            <span className="flex items-center gap-1.5 surface-glass px-3 py-1.5">
              <Calendar size={12} className="text-soft-gold" /> Last Updated: June 2026
            </span>
          </div>

          <div className="space-y-10 md:space-y-12 text-body leading-relaxed">
            <p className="text-lg">
              Quiet Psychology respects your privacy and is committed to protecting your personal information.
            </p>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Information We Collect</h2>
              </div>
              <p className="mb-3">We may collect:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Name</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Email address</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Purchase information</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Device information</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Browser information</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> IP address</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Website interaction data</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Server size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Analytics Technologies</h2>
              </div>
              <p>We use Google Analytics and Microsoft Clarity to better understand website performance and user behavior.</p>
              <p className="mt-3">These services may collect information about how visitors interact with our website.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cookie size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Cookies</h2>
              </div>
              <p className="mb-3">Our website uses cookies and similar technologies to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Improve website functionality</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Analyze traffic</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Enhance user experience</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Measure marketing performance</li>
              </ul>
              <p className="mt-3">Users may disable cookies through their browser settings.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Email Collection</h2>
              </div>
              <p className="mb-3">When voluntarily provided, email addresses may be used to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Deliver purchased products</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Respond to customer support requests</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Provide account-related communications</li>
              </ul>
              <p className="mt-3">We do not sell personal information to third parties.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Data Security</h2>
              </div>
              <p>Reasonable technical and organizational measures are used to protect collected information.</p>
              <p className="mt-3">However, no online transmission or storage method can be guaranteed as completely secure.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Third-Party Services</h2>
              </div>
              <p className="mb-3">We may use trusted third-party providers including:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Gumroad</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Google Analytics</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Microsoft Clarity</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Cloudflare</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Render</li>
              </ul>
              <p className="mt-3">Each provider maintains its own privacy practices and policies.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">International Users</h2>
              </div>
              <p>Quiet Psychology serves customers worldwide.</p>
              <p className="mt-3">By using this website, users understand that their information may be processed in countries outside their place of residence.</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Your Rights</h2>
              <p className="mb-3">Depending on your jurisdiction, you may have rights regarding:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Access to personal information</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Correction of information</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Deletion requests</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Data portability requests</li>
              </ul>
              <p className="mt-3">Requests may be submitted to{' '}
                <a href="mailto:quietpsychologyhq@gmail.com" className="text-soft-gold hover:underline">
                  quietpsychologyhq@gmail.com
                </a>.
              </p>
            </div>

            <div className="surface-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-soft-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-soft-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-heading mb-2">Contact</h2>
                  <a href="mailto:quietpsychologyhq@gmail.com" className="text-soft-gold hover:underline font-medium">
                    quietpsychologyhq@gmail.com
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
