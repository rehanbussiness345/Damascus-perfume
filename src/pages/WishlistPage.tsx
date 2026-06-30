import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../store/cartStore';

interface WishlistPageProps {
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
}

export default function WishlistPage({ onNavigate, onViewProduct }: WishlistPageProps) {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: '30ml',
    });
    removeFromWishlist(item.id);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-48 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative flex items-center justify-center h-full text-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Your Favourites
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Wishlist
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-24">
              <Heart size={64} className="text-gold/20 mx-auto mb-8" />
              <h2 className="font-display text-3xl text-charcoal/40 mb-4">Your wishlist is empty</h2>
              <p className="text-warm-gray text-base font-body mb-10 max-w-md mx-auto">
                Save your favorite fragrances to your wishlist and never lose track of the scents you love.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="btn-primary mx-auto"
              >
                Explore Collection <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-warm-gray font-body mb-8">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                {wishlistItems.map((item, idx) => (
                  <div key={item.id} className="group animate-fade-in-up opacity-0" style={{ animationDelay: `${0.05 * idx}s`, animationFillMode: 'forwards' }}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5 cursor-pointer" onClick={() => onViewProduct(item.id)}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-rose hover:bg-rose hover:text-white transition-all duration-300"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                          className="w-full bg-charcoal/95 backdrop-blur-sm text-white py-3.5 text-xs uppercase tracking-[0.15em] font-body hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <ShoppingBag size={14} />
                          Add to Bag
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 
                        className="font-display text-base font-semibold text-charcoal group-hover:text-gold transition-colors duration-300 cursor-pointer mb-2" 
                        onClick={() => onViewProduct(item.id)}
                      >
                        {item.name}
                      </h3>
                      <p className="font-display text-base font-bold text-charcoal">€{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
