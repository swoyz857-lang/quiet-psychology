import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';
import { MessageCircle, X, Mail, FileQuestion, Send } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FAQ_SUGGESTIONS = [
  'How do I access my download?',
  'What format are the books in?',
  'What is your refund policy?',
  'Do you offer coaching?',
];

const RESPONSES: Record<string, string> = {
  'download': 'After purchase you\'ll receive an email with a secure download link. You can also access your books anytime from your account dashboard.',
  'access': 'After purchase you\'ll receive an email with a secure download link. You can also access your books anytime from your account dashboard.',
  'format': 'Our books are delivered as high-quality PDF and EPUB files, readable on any phone, tablet, e-reader, or computer.',
  'refund': 'All sales are final. Because our digital products are delivered instantly, we do not offer refunds. Please review the description carefully before purchasing.',
  'return': 'All sales are final. Because our digital products are delivered instantly, we do not offer refunds. Please review the description carefully before purchasing.',
  'coaching': 'We currently focus on self-guided digital publications. For speaking, partnership, or enterprise inquiries, email hello@quietpsychology.com.',
  'contact': 'You can reach us at hello@quietpsychology.com. We typically respond within 24–48 hours.',
  'support': 'You can reach us at hello@quietpsychology.com. We typically respond within 24–48 hours.',
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(RESPONSES)) {
    if (lower.includes(key)) return RESPONSES[key];
  }
  return 'I\'m not sure I understand. Try one of the suggested questions below, or email us at hello@quietpsychology.com.';
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Quiet Psychology. Ask me anything about our books, formats, or policies.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-support-widget' as any, handleOpen);
    return () => window.removeEventListener('open-support-widget' as any, handleOpen);
  }, []);

  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: getBotReply(msg) }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "items-center gap-2 bg-soft-gold text-obsidian px-5 py-3 font-medium shadow-lg hover:bg-soft-gold-light transition-colors pulse-gold",
            "hidden md:flex"
          )}
          aria-label="Open support chat"
        >
          <MessageCircle size={18} />
          <span>Ask QP</span>
        </button>
      )}

      {open && (
        <div className="w-[calc(100vw-2rem)] sm:w-96 surface-card shadow-2xl flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/10">
            <div>
              <span className="font-serif text-lg text-heading">Quiet Assistant</span>
              <p className="text-[10px] tracking-widest uppercase text-body">AI-guided support</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close support" className="text-body hover:text-soft-gold transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[240px]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-sm px-4 py-3 leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-soft-gold text-obsidian rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                    : 'mr-auto surface-elevated text-heading rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-black/5 dark:border-white/5'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-black/5 dark:border-white/10">
            <div className="flex gap-2 mb-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button onClick={() => handleSend()} className="px-3" aria-label="Send message">
                <Send size={16} />
              </Button>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-body mb-2">Suggested</p>
            <div className="flex flex-wrap gap-2">
              {FAQ_SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 border border-black/10 dark:border-white/10 text-body hover:border-soft-gold/50 hover:text-soft-gold transition-colors rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <a href="/faq" className="flex items-center gap-2 text-xs text-body hover:text-soft-gold transition-colors">
                <FileQuestion size={14} />
                Browse FAQ
              </a>
              <a href="mailto:hello@quietpsychology.com" className="flex items-center gap-2 text-xs text-soft-gold hover:text-soft-gold-light transition-colors">
                <Mail size={14} />
                Email us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
