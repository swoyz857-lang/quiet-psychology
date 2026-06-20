import { useEffect } from 'react';
import { Users, BookOpen } from 'lucide-react';
import { TRUST_METRICS } from '../lib/constants';
import TiltCard from './TiltCard';
import SpotlightCard from './SpotlightCard';
import AnimatedStarRating from './ui/AnimatedStarRating';
import AnimatedShield from './AnimatedShield';
import { useCountUpOnTrigger } from '../hooks/useCountUp';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CountUpProps {
  end: number;
  suffix?: string;
  isDecimal?: boolean;
  trigger: boolean;
}

function CountUp({ end, suffix, isDecimal, trigger }: CountUpProps) {
  const { count, trigger: start } = useCountUpOnTrigger(isDecimal ? Math.round(end * 10) : end, 1400);

  useEffect(() => {
    if (trigger) start();
  }, [trigger, start]);

  return (
    <>
      {isDecimal ? (count / 10).toFixed(1) : count.toLocaleString('en-US')}
      {suffix}
    </>
  );
}

export default function TrustIndicators() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
      <TiltCard>
        <SpotlightCard>
          <div className="surface-elevated text-center p-5 md:p-7 hover:border-soft-gold/30 transition-colors duration-300">
            <div className="h-6 flex items-center justify-center mb-3">
              <AnimatedStarRating rating={TRUST_METRICS.rating} size={18} />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-heading mb-1">
              <CountUp end={TRUST_METRICS.rating} isDecimal trigger={isVisible} />
            </p>
            <p className="text-[10px] md:text-xs tracking-widest uppercase text-body">Average Rating</p>
          </div>
        </SpotlightCard>
      </TiltCard>

      <TiltCard>
        <SpotlightCard>
          <div className="surface-elevated text-center p-5 md:p-7 hover:border-soft-gold/30 transition-colors duration-300">
            <div className="h-6 flex items-center justify-center mb-3">
              <Users size={22} className="text-soft-gold" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-heading mb-1">
              <CountUp end={TRUST_METRICS.purchases} trigger={isVisible} />
            </p>
            <p className="text-[10px] md:text-xs tracking-widest uppercase text-body">Purchases</p>
          </div>
        </SpotlightCard>
      </TiltCard>

      <TiltCard>
        <SpotlightCard>
          <div className="surface-elevated text-center p-5 md:p-7 hover:border-soft-gold/30 transition-colors duration-300">
            <div className="h-6 flex items-center justify-center mb-3">
              <BookOpen size={22} className="text-soft-gold" />
            </div>
            <p className="font-serif text-2xl md:text-3xl text-heading mb-1">
              <CountUp end={TRUST_METRICS.reviews} trigger={isVisible} />
            </p>
            <p className="text-[10px] md:text-xs tracking-widest uppercase text-body">Reviews</p>
          </div>
        </SpotlightCard>
      </TiltCard>

      <TiltCard>
        <SpotlightCard>
          <div className="surface-elevated text-center p-5 md:p-7 hover:border-soft-gold/30 transition-colors duration-300">
            <AnimatedShield size={22} />
            <p className="font-serif text-2xl md:text-3xl text-heading mb-1 mt-3">
              <CountUp end={100} suffix="%" trigger={isVisible} />
            </p>
            <p className="text-[10px] md:text-xs tracking-widest uppercase text-body">Secure Checkout</p>
          </div>
        </SpotlightCard>
      </TiltCard>
    </div>
  );
}
