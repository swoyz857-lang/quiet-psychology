import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 dark:divide-white/10 border-t border-b border-black/10 dark:border-white/10">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between py-6 text-left group"
          >
            <span className="font-serif text-lg md:text-xl text-heading pr-4 group-hover:text-soft-gold transition-colors">
              {item.question}
            </span>
            <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-black/10 dark:border-white/10 text-light-text dark:text-muted-gray group-hover:border-soft-gold/40 group-hover:text-soft-gold transition-colors">
              {open === index ? <Minus size={16} /> : <Plus size={16} />}
            </span>
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              open === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
            )}
          >
            <p className="text-body leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
