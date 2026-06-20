import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg surface-card p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-light-text dark:text-muted-gray hover:text-soft-gold transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h3 className="font-serif text-2xl text-heading mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}
