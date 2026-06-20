import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  reveal?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', reveal }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <div ref={reveal ? ref : undefined} className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="text-xs tracking-[0.2em] uppercase text-soft-gold mb-4 font-medium">{eyebrow}</p>
      )}
      {reveal ? (
        <div className="overflow-hidden">
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-heading mb-6 leading-tight gradient-shift ${
              isVisible ? 'reveal-left' : 'opacity-0'
            }`}
          >
            {title}
          </h2>
        </div>
      ) : (
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-heading mb-6 leading-tight gradient-shift">
          {title}
        </h2>
      )}
      {description && <p className="text-body leading-relaxed text-lg md:text-xl">{description}</p>}
    </div>
  );
}
