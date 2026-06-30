import { useState } from 'react';
import { Star, Heart, ShoppingBag, Minus, Plus, ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../store/cartStore';
import ProductCard from '../components/ProductCard';

interface ProductPageProps {
  productId: string;
  onViewProduct: (id: string) => void;
  onNavigate: (page: string) => void;
}

export default function ProductPage({ productId, onViewProduct, onNavigate }: ProductPageProps) {
  const product = products.find(p => p.id === productId);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '30ml');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="container-main py-24 text-center">
        <p className="font-display text-2xl text-charcoal/40 mb-4">Product not found</p>
        <button onClick={() => onNavigate('shop')} className="text-gold underline font-body hover:text-gold-dark transition-colors">
          Return to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const sizePrice = selectedSize === '50ml' ? product.price : Math.round(product.price * 0.65);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: sizePrice,
        image: product.image,
        size: selectedSize,
      });
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container-main py-5">
        <nav className="flex items-center gap-2 text-xs font-body text-warm-gray">
          <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors duration-300">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-gold transition-colors duration-300">Shop</button>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="container-main pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[3/4] overflow-hidden bg-cream mb-4">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-all duration-300 ${
                      idx === activeImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pt-2">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-3">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#C8A96E' : 'none'} className="text-gold" />
                ))}
              </div>
              <span className="text-sm text-warm-gray font-body">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-4xl font-bold text-charcoal">€{sizePrice.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-warm-gray line-through font-body">€{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-warm-gray text-base font-body leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-body font-semibold text-charcoal mb-4">Fragrance Notes</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map(note => (
                  <span key={note} className="px-4 py-2 bg-cream text-xs font-body tracking-wide text-charcoal/70 border border-gold/10">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase font-body font-semibold text-charcoal mb-4">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-8 py-3.5 text-sm font-body border transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-gold bg-gold text-white'
                        : 'border-gold/20 text-charcoal hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-gold/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-14 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-body font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-14 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-charcoal text-white py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag size={16} />
                Add to Bag
              </button>
              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })}
                className={`w-14 border flex items-center justify-center transition-all duration-300 ${
                  wishlisted ? 'border-gold bg-gold text-white' : 'border-gold/20 text-charcoal/60 hover:border-gold hover:text-gold'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Buy Now */}
            <button className="w-full border-2 border-gold text-gold py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold hover:text-white transition-all duration-300 mb-10">
              Buy Now
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gold/10">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Over €50' },
                { icon: Shield, label: '100% Authentic', sub: 'Guaranteed' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30 Days' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={20} className="text-gold mx-auto mb-2" />
                  <p className="text-xs font-body font-medium text-charcoal">{label}</p>
                  <p className="text-[10px] text-warm-gray font-body">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-cream">
        <div className="container-main section-padding">
          <div className="border-b border-gold/10 mb-10">
            <div className="flex gap-10">
              {[
                { id: 'description', label: 'Description' },
                { id: 'details', label: 'Details & Care' },
                { id: 'reviews', label: `Reviews (${product.reviews})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-5 text-sm font-body uppercase tracking-[0.15em] transition-all duration-300 border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-gold text-gold font-medium'
                      : 'border-transparent text-charcoal/50 hover:text-charcoal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="animate-fade-in">
                <p className="text-warm-gray font-body leading-relaxed mb-8">{product.description}</p>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Fragrance Family', value: 'Oriental / Arabic' },
                    { label: 'Longevity', value: '8 — 12 hours' },
                    { label: 'Sillage', value: 'Moderate to Strong' },
                    { label: 'Best For', value: 'All Occasions' },
                  ].map(item => (
                    <div key={item.label}>
                      <h4 className="font-display text-sm font-semibold text-charcoal mb-1">{item.label}</h4>
                      <p className="text-warm-gray text-sm font-body">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="animate-fade-in space-y-6">
                <p className="text-warm-gray font-body leading-relaxed">Our perfumes are crafted with the finest ingredients, sourced directly from trusted suppliers across the Middle East and Europe.</p>
                <div>
                  <h4 className="font-display text-sm font-semibold text-charcoal mb-2">Ingredients</h4>
                  <p className="text-warm-gray text-sm font-body">{product.notes.join(', ')}, Alcohol Denat., Aqua</p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-charcoal mb-2">Care Instructions</h4>
                  <p className="text-warm-gray text-sm font-body">Store in a cool, dry place away from direct sunlight. Apply to pulse points for optimal fragrance projection and longevity.</p>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="font-display text-5xl font-bold text-charcoal">{product.rating}</p>
                    <div className="flex items-center gap-0.5 justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#C8A96E' : 'none'} className="text-gold" />
                      ))}
                    </div>
                    <p className="text-xs text-warm-gray font-body mt-2">{product.reviews} reviews</p>
                  </div>
                </div>
                <p className="text-warm-gray text-sm font-body italic">Customer reviews are displayed on verified purchase basis.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding">
          <div className="container-main">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-[32px] gap-4">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-3">You May Also Like</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                  Related <span className="italic font-elegant font-normal text-gold">Fragrances</span>
                </h2>
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="text-charcoal text-sm font-body tracking-wider uppercase flex items-center gap-2 hover:text-gold transition-colors duration-300 group"
              >
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onViewProduct={onViewProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
