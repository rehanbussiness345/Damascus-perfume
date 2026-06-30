import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-400"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gold/10">
            <h2 className="font-display text-xl font-semibold tracking-wide">Your Bag</h2>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={56} className="text-gold/20 mb-6" />
                <p className="font-display text-xl text-charcoal/50 mb-3">Your bag is empty</p>
                <p className="text-sm text-warm-gray font-body max-w-[240px]">Explore our collection and discover your signature scent.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-5 pb-6 border-b border-gold/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-display text-sm font-semibold text-charcoal">{item.name}</h3>
                          <p className="text-xs text-warm-gray font-body mt-1">{item.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="w-8 h-8 flex items-center justify-center text-warm-gray/60 hover:text-charcoal transition-colors duration-300 shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gold/15">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-sm font-body">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors duration-300"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-display font-bold text-sm">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="px-6 py-6 border-t border-gold/10 bg-cream/50">
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm font-body text-charcoal/60 uppercase tracking-[0.15em]">Subtotal</span>
                <span className="font-display text-2xl font-bold">€{cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-warm-gray mb-5 font-body">Shipping & taxes calculated at checkout</p>
              <button className="w-full bg-charcoal text-white py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold transition-colors duration-300">
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full mt-3 py-3 text-sm uppercase tracking-[0.1em] font-body text-charcoal/60 hover:text-charcoal transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
