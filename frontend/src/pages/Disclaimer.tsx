import { useEffect } from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { trackPageView } from '../hooks/useAnalytics';
import { Mail, Calendar, AlertTriangle, HeartPulse, Scale, UserCheck } from 'lucide-react';

export default function Disclaimer() {
  useEffect(() => {
    trackPageView('/disclaimer');
  }, []);

  return (
    <>
      <SEO title="Disclaimer | Quiet Psychology" description="Disclaimer for Quiet Psychology educational content." pathname="/disclaimer" />
      <section className="page-section">
        <div className="container-narrow">
          <SectionHeading title="Disclaimer" align="center" />

          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-4 text-xs text-body">
            <span className="flex items-center gap-1.5 surface-glass px-3 py-1.5">
              <Calendar size={12} className="text-soft-gold" /> Last Updated: June 2026
            </span>
          </div>

          <div className="space-y-10 md:space-y-12 text-body leading-relaxed">
            <p className="text-lg">
              The content provided by Quiet Psychology is intended solely for educational and informational purposes.
            </p>

            <div className="surface-card p-6 md:p-8 border-l-4 border-soft-gold">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">Not Professional Advice</h2>
              </div>
              <p>
                Quiet Psychology is a digital publishing platform and does not provide medical, psychological, psychiatric, legal, financial, or professional advice.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <HeartPulse size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">No Treatment or Diagnosis</h2>
              </div>
              <p className="mb-3">The information contained in our products, ebooks, guides, articles, and website content should not be interpreted as:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Therapy</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Psychological treatment</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Mental health counseling</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Medical diagnosis</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Legal advice</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Professional consultation</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">User Responsibility</h2>
              </div>
              <p>Users are responsible for their own decisions, actions, and interpretations of the information provided.</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale size={20} className="text-soft-gold" />
                <h2 className="font-serif text-2xl text-heading">No Guaranteed Outcomes</h2>
              </div>
              <p className="mb-3">Quiet Psychology makes no guarantees regarding:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Relationship outcomes</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Personal outcomes</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Behavioral outcomes</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Financial outcomes</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Emotional outcomes</li>
              </ul>
              <p className="mt-3">Results may vary significantly between individuals.</p>
            </div>

            <div className="surface-card p-6 md:p-8 border-l-4 border-red-400/50">
              <h2 className="font-serif text-2xl text-heading mb-4">Seek Professional Help When Needed</h2>
              <p>
                If you are experiencing mental health concerns, emotional distress, depression, anxiety, trauma, or any medical condition, you should seek assistance from a qualified healthcare professional.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-heading mb-4">Acknowledgment</h2>
              <p className="mb-3">By purchasing or using Quiet Psychology products, you acknowledge that:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> You are using the information voluntarily.</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> You are solely responsible for your decisions and actions.</li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-soft-gold rounded-full shrink-0" /> Quiet Psychology shall not be liable for any direct or indirect consequences resulting from the use of our content.</li>
              </ul>
            </div>

            <div className="surface-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-soft-gold/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-soft-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-heading mb-2">Contact</h2>
                  <p className="mb-2">For questions regarding this disclaimer:</p>
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
