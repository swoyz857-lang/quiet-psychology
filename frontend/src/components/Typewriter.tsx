import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function Typewriter({
  text,
  delay = 0,
  speed = 32,
  className,
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const [display, setDisplay] = useState('');
  const [showCursor, setShowCursor] = useState(cursor);
  const indexRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const start = () => {
      startedRef.current = true;
      interval = setInterval(() => {
        indexRef.current += 1;
        setDisplay(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowCursor(false);
            onComplete?.();
          }, 800);
        }
      }, speed);
    };

    timeout = setTimeout(start, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span className={cn('inline', className)}>
      {display}
      {showCursor && <span className="animate-pulse text-soft-gold">|</span>}
    </span>
  );
}
