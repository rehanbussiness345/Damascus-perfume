import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;

  return (
    <div className="bg-charcoal text-white relative">
      <div className="container-main py-3 flex items-center justify-center">
        <p className="text-xs md:text-sm font-body tracking-wider text-center text-white/90">
          <span className="text-gold">✨</span>
          {' '}Free Shipping on Orders Over €50 — Authentic Arabic Fragrances Delivered Across Europe
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 md:right-6 lg:right-20 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-300"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
