import { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
  onViewProduct: (id: string) => void;
}

export default function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewProduct(product.id)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-charcoal text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-body font-medium">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-body font-medium">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-body font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            wishlisted 
              ? 'bg-gold text-white' 
              : 'bg-white/90 backdrop-blur-sm text-charcoal/60 hover:bg-gold hover:text-white'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 flex gap-2 transition-all duration-400 ease-out ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-charcoal/95 backdrop-blur-sm text-white py-3.5 text-xs uppercase tracking-[0.15em] font-body font-medium hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onViewProduct(product.id); }}
            className="w-12 bg-white/95 backdrop-blur-sm text-charcoal flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center px-1">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold font-body mb-2">
          {product.category}
        </p>
        <h3 className="font-display text-base md:text-lg font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < Math.floor(product.rating) ? '#C8A96E' : 'none'}
              className="text-gold"
            />
          ))}
          <span className="text-xs text-warm-gray ml-1.5 font-body">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="font-display text-lg font-bold text-charcoal">
            €{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-warm-gray line-through font-body">
              €{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
