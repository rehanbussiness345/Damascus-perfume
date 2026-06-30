import { useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Simple global state using a singleton pattern
let cartItems: CartItem[] = [];
let wishlistItems: WishlistItem[] = [];
let listeners: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach(l => l());
}

export function useCart() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  // Subscribe on mount
  useState(() => {
    const unsub = subscribe();
    return unsub;
  });

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existing = cartItems.find(i => i.id === item.id && i.size === item.size);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    cartItems = [...cartItems];
    notifyListeners();
  };

  const removeFromCart = (id: string, size: string) => {
    cartItems = cartItems.filter(i => !(i.id === id && i.size === size));
    notifyListeners();
  };

  const updateQuantity = (id: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id, size);
      return;
    }
    const item = cartItems.find(i => i.id === id && i.size === size);
    if (item) {
      item.quantity = qty;
      cartItems = [...cartItems];
      notifyListeners();
    }
  };

  const clearCart = () => {
    cartItems = [];
    notifyListeners();
  };

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlistItems.find(i => i.id === item.id)) {
      wishlistItems = [...wishlistItems, item];
      notifyListeners();
    }
  };

  const removeFromWishlist = (id: string) => {
    wishlistItems = wishlistItems.filter(i => i.id !== id);
    notifyListeners();
  };

  const isInWishlist = (id: string) => wishlistItems.some(i => i.id === id);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartTotal,
    cartCount,
  };
}
