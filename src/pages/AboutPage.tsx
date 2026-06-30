import { ArrowRight, Award, Heart, Leaf, Globe, Sparkles, Eye } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.pexels.com/photos/13068365/pexels-photo-13068365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1920"
            alt="About Damascus Perfumes"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative flex items-center justify-center h-full text-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              About Damascus
            </h1>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-5">The Soul of Arabia</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-8 leading-tight">
                Where Tradition<br />
                <span className="italic font-elegant font-normal text-gold">Meets Modern Elegance</span>
              </h2>
              <div className="space-y-5 text-warm-gray text-base font-body leading-relaxed">
                <p>
                  Damascus Perfumes was born from a passion for authentic Arabic fragrance traditions and a desire to bring the richness of the Middle East to Europe. Based in Austria, we specialize in premium Arabic perfumes, luxurious oud, and traditional bakhoor — carefully selected to deliver depth, elegance, and lasting impressions.
                </p>
                <p>
                  Our collections combine heritage and craftsmanship with modern sophistication. From deep woody oud blends to sweet oriental notes and refined French-inspired scents, each fragrance is chosen to reflect quality, character, and individuality.
                </p>
                <p>
                  At Damascus Perfumes, we believe fragrance is more than a scent — it is identity, memory, and emotion. Our mission is to offer distinctive perfumes that speak of luxury, culture, and timeless beauty.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/19663386/pexels-photo-19663386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                  alt="Damascus Perfumes boutique"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-gold text-white p-8 hidden md:block">
                <p className="font-display text-4xl font-bold">100%</p>
                <p className="text-xs tracking-[0.15em] uppercase font-body mt-2">Authentic Arabic Fragrances</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-charcoal">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">What Drives Us</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Mission & <span className="italic font-elegant font-normal text-gold">Vision</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="border border-white/10 p-10 md:p-14 hover:border-gold/30 transition-colors duration-500">
              <Eye size={36} className="text-gold mb-8" />
              <h3 className="font-display text-2xl font-semibold text-white mb-5">Our Mission</h3>
              <p className="text-white/60 font-body leading-relaxed text-base">
                To offer distinctive perfumes that speak of luxury, culture, and timeless beauty. We curate our selection to ensure our customers experience true luxury and tradition — providing an unparalleled sensory experience.
              </p>
            </div>
            <div className="border border-white/10 p-10 md:p-14 hover:border-gold/30 transition-colors duration-500">
              <Sparkles size={36} className="text-gold mb-8" />
              <h3 className="font-display text-2xl font-semibold text-white mb-5">Our Vision</h3>
              <p className="text-white/60 font-body leading-relaxed text-base">
                To be the leading destination for authentic Arabic fragrances in Europe — bridging the rich traditions of Middle Eastern perfumery with the refined sensibilities of modern luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4">Our Promise</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
              Why Choose <span className="italic font-elegant font-normal text-gold">Damascus</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Each product is carefully selected and crafted to reflect the region\'s rich heritage and contemporary evolution.' },
              { icon: Heart, title: 'Customer Promise', desc: 'Exceptional personalized service with offers, discounts, and convenient delivery options across Europe.' },
              { icon: Leaf, title: 'Authentic Ingredients', desc: 'From traditional oud perfumes to modern interpretations, all ingredients are sourced from trusted suppliers.' },
              { icon: Globe, title: 'European Delivery', desc: 'Based in Vienna, Austria — we deliver authentic Arabic fragrances across Europe with care and precision.' },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="text-center p-8 hover:bg-cream transition-colors duration-500 animate-fade-in-up opacity-0" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'forwards' }}>
                <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal mb-4">{title}</h3>
                <p className="text-warm-gray text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="section-padding bg-cream">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="md:order-2">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7405394/pexels-photo-7405394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                  alt="Quality perfumes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:order-1">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-5">Our Craft</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-8 leading-tight">
                Quality & <span className="italic font-elegant font-normal text-gold">Craftsmanship</span>
              </h2>
              <div className="space-y-5 text-warm-gray text-base font-body leading-relaxed">
                <p>
                  Our online store specializes in offering a wide selection of oud and incense perfumes. With a focus on quality and authenticity, we curate our collection to ensure our customers experience true luxury and tradition.
                </p>
                <p>
                  From traditional oud perfumes to modern interpretations, our range caters to diverse preferences, providing an unforgettable sensory journey. Each product is carefully selected and crafted to reflect the region's rich heritage and contemporary evolution.
                </p>
                <p>
                  We also provide comprehensive information about each product, including its ingredients, uses, and effects, enabling customers to confidently choose what best suits their needs.
                </p>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="mt-10 btn-primary"
              >
                Explore Our Collection <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
