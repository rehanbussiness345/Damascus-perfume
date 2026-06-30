import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/[0.06]">
        <div className="container-main py-12 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Join the Damascus <span className="italic font-elegant font-normal text-gold">Community</span>
              </h3>
              <p className="text-white/50 text-sm font-body leading-relaxed">
                Get 10% off your first order plus exclusive access to new arrivals and offers.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="text-gold text-sm font-body py-4 animate-fade-in">
                  ✓ Thank you for subscribing! Check your inbox for your welcome discount.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-4 bg-white/[0.04] border border-white/10 border-r-0 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gold text-white px-8 py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold-dark transition-colors duration-300 whitespace-nowrap shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand — 4 cols */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold tracking-[0.15em] uppercase">Damascus</h3>
              <p className="text-[10px] tracking-[0.4em] text-gold uppercase font-body font-medium">Perfumes</p>
            </div>
            <p className="text-white/50 text-sm font-body leading-[1.8] mb-8 max-w-xs">
              Born from a passion for authentic Arabic fragrance traditions. Premium Arabic perfumes, luxurious oud, and traditional bakhoor — based in Vienna, Austria.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/damascus_perfumes_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center text-white/40 hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href="#"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center text-white/40 hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon size={17} />
              </a>
              <a
                href="mailto:info@damascusperfumes.com"
                className="w-11 h-11 border border-white/15 rounded-full flex items-center justify-center text-white/40 hover:bg-gold hover:border-gold hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Shop — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold tracking-[0.25em] uppercase mb-7 text-gold">
              Shop
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'All Fragrances', page: 'shop' },
                { label: 'New Arrivals', page: 'shop' },
                { label: 'Best Sellers', page: 'shop' },
                { label: 'Collections', page: 'collections' },
                { label: 'Gift Sets', page: 'shop' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-white/50 text-sm font-body hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs font-semibold tracking-[0.25em] uppercase mb-7 text-gold">
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', page: 'about' },
                { label: 'Contact', page: 'contact' },
                { label: 'Shipping Policy', page: '' },
                { label: 'Return Policy', page: '' },
                { label: 'Privacy Policy', page: '' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => item.page && onNavigate(item.page)}
                    className="text-white/50 text-sm font-body hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-xs font-semibold tracking-[0.25em] uppercase mb-7 text-gold">
              Get In Touch
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={16} className="text-gold mt-1 shrink-0" />
                <p className="text-white/50 text-sm font-body leading-relaxed">Vienna, Austria</p>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={16} className="text-gold mt-1 shrink-0" />
                <a href="mailto:info@damascusperfumes.com" className="text-white/50 text-sm font-body hover:text-gold transition-colors duration-300">
                  info@damascusperfumes.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={16} className="text-gold mt-1 shrink-0" />
                <a href="tel:+43123456789" className="text-white/50 text-sm font-body hover:text-gold transition-colors duration-300">
                  +43 123 456 789
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-[10px] text-white/30 font-body tracking-[0.2em] uppercase mb-2">Business Hours</p>
              <p className="text-sm text-white/50 font-body">Mon — Fri: 9:00 — 18:00</p>
              <p className="text-sm text-white/50 font-body">Sat: 10:00 — 16:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body tracking-wider">
            © 2025 Damascus Perfumes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Visa', 'Mastercard', 'PayPal', 'Klarna'].map(method => (
              <span key={method} className="text-white/25 text-[11px] font-body tracking-wide font-medium uppercase">{method}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
