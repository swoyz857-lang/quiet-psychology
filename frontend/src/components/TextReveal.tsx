import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  highlight?: string;
  highlightClassName?: string;
}

export default function TextReveal({ text, className, highlight, highlightClassName }: TextRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLHeadingElement>();
  const words = text.split(' ');

  return (
    <h1
      ref={ref}
      className={cn('overflow-hidden', className)}
    >
      {words.map((word, i) => {
        const isHighlight = highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span
            key={i}
            className={cn(
              'inline-block mr-[0.25em] transition-transform duration-700 ease-out-expo',
              isHighlight && highlightClassName,
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
}
