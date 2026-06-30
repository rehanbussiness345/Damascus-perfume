import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../store/cartStore';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartOpen: () => void;
}

export default function Header({ currentPage, onNavigate, onCartOpen }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlistItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-400 ${scrolled ? 'bg-ivory/98 backdrop-blur-lg shadow-sm' : 'bg-ivory/95 backdrop-blur-md'} border-b border-gold/10`}>
      <div className="container-main">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal hover:text-gold transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center cursor-pointer group"
          >
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-[0.15em] text-charcoal uppercase group-hover:text-gold transition-colors duration-300">
              Damascus
            </h1>
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] text-gold uppercase font-body font-medium -mt-0.5">
              Perfumes
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative text-[13px] tracking-[0.15em] uppercase font-body font-medium transition-colors duration-300 py-2 ${
                  currentPage === item.id
                    ? 'text-gold'
                    : 'text-charcoal/70 hover:text-gold'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => onNavigate('wishlist')}
              className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-white text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button
              onClick={onCartOpen}
              className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-gold transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-white text-[10px] font-body font-semibold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="hidden md:flex w-10 h-10 items-center justify-center text-charcoal/60 hover:text-gold transition-colors duration-300"
              aria-label="Account"
            >
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-gold/10 animate-fade-in">
            <div className="relative max-w-2xl mx-auto">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="text"
                placeholder="Search fragrances, collections..."
                className="w-full pl-14 pr-5 py-4 bg-white border border-gold/20 text-sm font-body placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors duration-300"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-ivory border-t border-gold/10 animate-fade-in">
          <nav className="container-main py-6 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={`text-left text-sm tracking-[0.15em] uppercase font-body py-4 border-b border-gold/5 transition-colors duration-300 ${
                  currentPage === item.id
                    ? 'text-gold font-medium'
                    : 'text-charcoal/70 hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
