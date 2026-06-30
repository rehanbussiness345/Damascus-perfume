import { ArrowRight, Droplets, Flame, Wind, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface CollectionsPageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
}

const collections = [
  {
    id: 'oud',
    name: 'Oud Collection',
    subtitle: 'The Heart of Arabian Luxury',
    description: 'Experience the depth and richness of aged oud — the crown jewel of Arabic perfumery. Each fragrance in this collection is a masterpiece of craftsmanship, designed to leave a lasting impression that lingers for hours.',
    longDescription: 'Oud, also known as agarwood, has been treasured for centuries across the Middle East and Asia. Our Oud Collection captures the most authentic expressions of this precious ingredient — from deep, smoky profiles to smooth, sophisticated blends.',
    image: 'https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=800',
    category: 'Oud Collection',
    icon: Flame,
    accent: 'Woody • Deep • Smoky',
    color: 'from-amber-950/80',
  },
  {
    id: 'musk',
    name: 'Musk Collection',
    subtitle: 'Soft, Luxurious & Alluring',
    description: 'Silky musks that whisper elegance. From sweet berry musks to deep black musks, discover the fragrance that speaks to your soul and defines your presence wherever you go.',
    longDescription: 'Our Musk Collection ranges from playful, fruity interpretations to intense, seductive dark musks. Each fragrance is designed to sit close to the skin and create an intimate, memorable aura.',
    image: 'https://images.pexels.com/photos/965730/pexels-photo-965730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=800',
    category: 'Musk Collection',
    icon: Wind,
    accent: 'Soft • Sensual • Clean',
    color: 'from-rose-950/80',
  },
  {
    id: 'premium',
    name: 'Premium Collection',
    subtitle: 'Refined French-Inspired Scents',
    description: 'Our premium line combines heritage and craftsmanship with modern sophistication. Refined, distinctive, and unforgettable — created for those who appreciate the finer things in life.',
    longDescription: 'Bridging the world of traditional Arabic perfumery with contemporary European aesthetics, our Premium Collection represents the pinnacle of our craft. Expect complex compositions with impeccable longevity.',
    image: 'https://images.pexels.com/photos/28664171/pexels-photo-28664171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=800',
    category: 'Premium Collection',
    icon: Sparkles,
    accent: 'Elegant • Complex • Long-lasting',
    color: 'from-stone-900/80',
  },
  {
    id: 'bakhoor',
    name: 'Bakhoor Collection',
    subtitle: 'Traditional Incense Reimagined',
    description: 'The rich, smoky traditions of the Middle East, captured in wearable form. Frankincense, myrrh, and precious resins for a truly authentic, grounding experience.',
    longDescription: 'Bakhoor has been an integral part of Arabic hospitality and ceremonies for centuries. We have translated these sacred, resinous scents into modern fragrances that honour tradition while embracing contemporary wear.',
    image: 'https://images.pexels.com/photos/13068356/pexels-photo-13068356.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=800',
    category: 'Bakhoor Collection',
    icon: Droplets,
    accent: 'Smoky • Resinous • Warm',
    color: 'from-neutral-900/80',
  },
];

export default function CollectionsPage({ onNavigate, onViewProduct }: CollectionsPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.pexels.com/photos/7405394/pexels-photo-7405394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920"
            alt="Collections"
            className="w-full h-full object-cover opacity-35"
          />
        </div>
        <div className="relative flex items-center justify-center h-full text-center">
          <div className="container-main">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Curated For You
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up opacity-0 mb-4" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Our Collections
            </h1>
            <p className="text-white/50 text-base md:text-lg font-body max-w-xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Four distinct worlds of fragrance, each telling its own story of heritage, luxury, and artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Overview Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {collections.map((col, idx) => (
              <a
                key={col.id}
                href={`#${col.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(col.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative aspect-[3/4] overflow-hidden animate-fade-in-up opacity-0"
                style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}
              >
                <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${col.color} via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <col.icon size={24} className="text-gold mb-3" />
                  <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-1">{col.name}</h3>
                  <p className="text-white/50 text-xs font-body tracking-wider">{col.accent}</p>
                  <div className="mt-4 flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] font-body font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    Explore <ArrowRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Collection Sections */}
      {collections.map((col, idx) => {
        const colProducts = products.filter(p => p.category === col.category);
        const isEven = idx % 2 === 0;

        return (
          <section key={col.id} id={col.id} className={`section-padding ${isEven ? 'bg-cream' : ''}`}>
            <div className="container-main">
              {/* Collection Header — Side-by-side */}
              <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center mb-14 md:mb-20">
                <div className={`${!isEven ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${col.color} via-transparent to-transparent opacity-60`} />
                    {/* Floating badge */}
                    <div className="absolute top-6 left-6 bg-gold/90 backdrop-blur-sm text-white px-4 py-2">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-body font-medium">{colProducts.length} Fragrances</p>
                    </div>
                  </div>
                </div>
                <div className={`${!isEven ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <col.icon size={20} className="text-gold" />
                    <p className="text-gold text-xs tracking-[0.3em] uppercase font-body">{col.subtitle}</p>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
                    {col.name}
                  </h2>
                  <p className="text-warm-gray text-base md:text-lg font-body leading-relaxed mb-4">
                    {col.description}
                  </p>
                  <p className="text-warm-gray/80 text-sm font-body leading-relaxed mb-8">
                    {col.longDescription}
                  </p>
                  {/* Accent tags */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {col.accent.split(' • ').map(tag => (
                      <span key={tag} className="px-4 py-2 border border-gold/15 text-xs font-body tracking-wider text-charcoal/60 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => onNavigate('shop')} className="btn-primary">
                    Shop {col.name.split(' ')[0]} <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Products */}
              {colProducts.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gold/10" />
                    <p className="text-xs text-warm-gray font-body tracking-[0.2em] uppercase shrink-0">
                      {col.name} — {colProducts.length} Fragrance{colProducts.length !== 1 ? 's' : ''}
                    </p>
                    <div className="h-px flex-1 bg-gold/10" />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {colProducts.map((p, pIdx) => (
                      <div key={p.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.08 * pIdx}s`, animationFillMode: 'forwards' }}>
                        <ProductCard product={p} onViewProduct={onViewProduct} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}

    </div>
  );
}
