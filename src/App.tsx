import { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import WishlistPage from './pages/WishlistPage';

type Page = 'home' | 'shop' | 'product' | 'collections' | 'about' | 'contact' | 'admin' | 'wishlist';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => setCartOpen(true);

  // Show admin with Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        navigate('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAdmin = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-ivory">
      {!isAdmin && (
        <>
          <AnnouncementBar />
          <Header
            currentPage={currentPage}
            onNavigate={navigate}
            onCartOpen={openCart}
          />
        </>
      )}

      <main>
        {currentPage === 'home' && (
          <HomePage onNavigate={navigate} onViewProduct={viewProduct} />
        )}
        {currentPage === 'shop' && (
          <ShopPage onViewProduct={viewProduct} />
        )}
        {currentPage === 'product' && (
          <ProductPage
            productId={selectedProductId}
            onViewProduct={viewProduct}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'collections' && (
          <CollectionsPage onNavigate={navigate} onViewProduct={viewProduct} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={navigate} />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'admin' && (
          <AdminPage />
        )}
        {currentPage === 'wishlist' && (
          <WishlistPage onNavigate={navigate} onViewProduct={viewProduct} />
        )}
      </main>

      {!isAdmin && <Footer onNavigate={navigate} />}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Admin Access Button */}
      {!isAdmin && (
        <button
          onClick={() => navigate('admin')}
          className="fixed bottom-6 left-6 w-10 h-10 bg-charcoal/80 text-white/40 rounded-full flex items-center justify-center text-xs font-body hover:bg-gold hover:text-white transition-all duration-300 z-40"
          title="Admin Dashboard"
        >
          ⚙
        </button>
      )}

      {/* Back to Store from Admin */}
      {isAdmin && (
        <button
          onClick={() => navigate('home')}
          className="fixed bottom-6 right-6 bg-gold text-white px-5 py-3 text-sm font-body tracking-wider hover:bg-gold-dark transition-colors z-40 flex items-center gap-2 shadow-lg"
        >
          ← Back to Store
        </button>
      )}
    </div>
  );
}
