import { useState } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Award, Quote } from 'lucide-react';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
}

export default function HomePage({ onNavigate, onViewProduct }: HomePageProps) {
  const [reviewIdx, setReviewIdx] = useState(0);

  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);
  const trending = products.filter(p => p.isTrending);

  const categoryImages = [
    {
      name: 'Premium Collection',
      desc: 'Refined French-inspired scents',
      img: 'https://images.pexels.com/photos/28664171/pexels-photo-28664171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500',
    },
    {
      name: 'Oud Collection',
      desc: 'Deep woody oud blends',
      img: 'https://images.pexels.com/photos/7405394/pexels-photo-7405394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500',
    },
    {
      name: 'Musk Collection',
      desc: 'Soft & luxurious musks',
      img: 'https://images.pexels.com/photos/19663386/pexels-photo-19663386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500',
    },
    {
      name: 'Bakhoor Collection',
      desc: 'Traditional incense fragrances',
      img: 'https://images.pexels.com/photos/13068365/pexels-photo-13068365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500',
    },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Damascus-perfume/images/hero-bg.jpg"
            alt="Damascus Perfumes luxury collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
        </div>
        
        <div className="relative container-main w-full">
          <div className="max-w-2xl">
            <p className="text-gold text-xs md:text-sm tracking-[0.35em] uppercase font-body mb-5 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              The Soul of Arabia
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Where Tradition<br />
              <span className="text-gold italic font-elegant font-normal">Meets Elegance</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg font-body leading-relaxed mb-10 max-w-lg animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Premium Arabic perfumes, luxurious oud, and traditional bakhoor — carefully selected to deliver depth, elegance, and lasting impressions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <button onClick={() => onNavigate('shop')} className="btn-primary">
                Explore Collection <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('about')} className="btn-secondary !border-white/30 !text-white hover:!bg-white/10 hover:!text-white">
                Our Story
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-body">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* ===== FEATURES BAR ===== */}
      <section className="bg-charcoal">
        <div className="container-main py-5 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Truck, text: 'Free Shipping Over €50' },
              { icon: Shield, text: '100% Authentic' },
              { icon: RotateCcw, text: '30-Day Returns' },
              { icon: Award, text: 'Premium Quality' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-3 py-2">
                <Icon size={20} className="text-gold shrink-0" />
                <span className="text-white/80 text-xs md:text-sm font-body tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-8 md:mb-[32px]">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">Discover</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-5">
              Browse Our <span className="italic font-elegant font-normal text-gold">Collections</span>
            </h2>
            <p className="text-warm-gray text-base md:text-lg font-body max-w-2xl mx-auto leading-relaxed">
              From deep woody oud blends to sweet oriental notes and refined French-inspired scents — each fragrance reflects quality and individuality.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryImages.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => onNavigate('shop')}
                className="group relative aspect-[4/5] overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-1">{cat.name}</h3>
                  <p className="text-white/60 text-xs md:text-sm font-body tracking-wide">{cat.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] font-body font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    Shop Now <ArrowRight size={12} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="section-padding bg-cream">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-[32px] gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-3">Most Loved</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                Best <span className="italic font-elegant font-normal text-gold">Sellers</span>
              </h2>
            </div>
            <button onClick={() => onNavigate('shop')} className="text-charcoal text-sm font-body tracking-wider uppercase flex items-center gap-2 hover:text-gold transition-colors duration-300 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {bestSellers.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} onViewProduct={onViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR HERITAGE ===== */}
      <section className="section-padding overflow-hidden">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left — Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/brand-story.jpg"
                  alt="Damascus Perfumes heritage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 md:-bottom-8 md:-right-8 bg-gold text-white py-6 px-8 hidden sm:block">
                <p className="font-display text-3xl md:text-4xl font-bold leading-none">100%</p>
                <p className="text-[11px] tracking-[0.2em] uppercase font-body mt-2 text-white/90">Authentic Fragrances</p>
              </div>
            </div>
            {/* Right — Content */}
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-5">Our Heritage</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[44px] font-bold text-charcoal leading-[1.15] mb-6">
                Fragrance is More Than<br className="hidden lg:block" /> a Scent — <span className="italic font-elegant font-normal text-gold">It is Identity</span>
              </h2>
              <p className="text-warm-gray text-base md:text-lg font-body leading-relaxed mb-6">
                Damascus Perfumes was born from a passion for authentic Arabic fragrance traditions and a desire to bring the richness of the Middle East to Europe.
              </p>
              <p className="text-warm-gray text-base font-body leading-relaxed mb-10">
                Based in Austria, we specialize in premium Arabic perfumes, luxurious oud, and traditional bakhoor — carefully selected to deliver depth, elegance, and lasting impressions. Our collections combine heritage and craftsmanship with modern sophistication.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { value: '50+', label: 'Fragrances' },
                  { value: '12+', label: 'Collections' },
                  { value: '1K+', label: 'Happy Customers' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-bold text-gold leading-none">{stat.value}</p>
                    <p className="text-xs text-warm-gray font-body tracking-wider uppercase mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate('about')} className="btn-primary">
                Discover Our Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section-padding bg-cream">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-[32px] gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-3">Just Arrived</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                New <span className="italic font-elegant font-normal text-gold">Arrivals</span>
              </h2>
            </div>
            <button onClick={() => onNavigate('shop')} className="text-charcoal text-sm font-body tracking-wider uppercase flex items-center gap-2 hover:text-gold transition-colors duration-300 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {newArrivals.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} onViewProduct={onViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRENDING FRAGRANCES ===== */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-[32px] gap-4">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-3">Popular Now</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                Trending <span className="italic font-elegant font-normal text-gold">Fragrances</span>
              </h2>
            </div>
            <button onClick={() => onNavigate('shop')} className="text-charcoal text-sm font-body tracking-wider uppercase flex items-center gap-2 hover:text-gold transition-colors duration-300 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {trending.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}>
                <ProductCard product={product} onViewProduct={onViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ===== CUSTOMER TESTIMONIALS ===== */}
      <section className="section-padding bg-charcoal">
        <div className="container-main">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">Testimonials</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              What Our <span className="italic font-elegant font-normal text-gold">Customers Say</span>
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/[0.03] border border-white/[0.08] p-8 md:p-12 lg:p-16">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10">
                <Quote size={40} className="text-gold/20" />
              </div>

              <div className="text-center pt-6 md:pt-4">
                {/* Stars */}
                <div className="flex items-center justify-center gap-1.5 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < reviews[reviewIdx].rating ? '#C8A96E' : 'none'} className="text-gold" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="font-elegant text-xl md:text-2xl lg:text-[28px] text-white/90 italic leading-relaxed mb-10 max-w-3xl mx-auto">
                  "{reviews[reviewIdx].text}"
                </blockquote>

                {/* Divider */}
                <div className="w-12 h-px bg-gold mx-auto mb-8" />

                {/* Author */}
                <p className="text-white font-display font-semibold text-base tracking-wider mb-1">
                  {reviews[reviewIdx].name}
                </p>
                <p className="text-white/40 text-sm font-body">
                  {reviews[reviewIdx].location}
                </p>
                <p className="text-gold/70 text-xs font-body mt-1.5 tracking-wider uppercase">
                  Purchased: {reviews[reviewIdx].product}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => setReviewIdx(Math.max(0, reviewIdx - 1))}
                disabled={reviewIdx === 0}
                className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-3">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    className={`h-2 rounded-full transition-all duration-400 ${i === reviewIdx ? 'bg-gold w-8' : 'bg-white/15 w-2 hover:bg-white/30'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setReviewIdx(Math.min(reviews.length - 1, reviewIdx + 1))}
                disabled={reviewIdx === reviews.length - 1}
                className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center text-white/30 hover:text-gold hover:border-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMOTIONAL BANNER ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-ivory to-cream" />
        <div className="relative container-main">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-5">Limited Offer</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
                Discover Your<br />
                <span className="italic font-elegant font-normal text-gold">Signature Scent</span>
              </h2>
              <p className="text-warm-gray text-base md:text-lg font-body leading-relaxed mb-8 max-w-md">
                Explore our curated selection of premium Arabic perfumes. Use code <strong className="text-charcoal font-semibold">DAMASCUS15</strong> for 15% off your first order.
              </p>
              <button onClick={() => onNavigate('shop')} className="btn-primary">
                Shop Now <ArrowRight size={16} />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7405394/pexels-photo-7405394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=600"
                  alt="Premium fragrance collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gold text-white p-6 hidden md:block">
                <p className="font-display text-3xl font-bold">15% OFF</p>
                <p className="text-xs tracking-wider uppercase font-body mt-1">First Order</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
