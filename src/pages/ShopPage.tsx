import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

interface ShopPageProps {
  onViewProduct: (id: string) => void;
}

export default function ShopPage({ onViewProduct }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedGender, setSelectedGender] = useState('all');
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedGender !== 'all') {
      filtered = filtered.filter(p => p.gender === selectedGender);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, selectedGender]);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.pexels.com/photos/13068365/pexels-photo-13068365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1920"
            alt="Shop all fragrances"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative flex items-center justify-center h-full text-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Damascus Perfumes
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Our Collection
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-main">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold/10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 text-sm font-body text-charcoal hover:text-gold transition-colors duration-300 uppercase tracking-[0.1em]"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <span className="text-warm-gray text-sm font-body">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'fragrance' : 'fragrances'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Grid Toggle - Desktop Only */}
              <div className="hidden lg:flex items-center gap-1 border border-gold/15 p-1">
                <button
                  onClick={() => setGridCols(3)}
                  className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${gridCols === 3 ? 'bg-charcoal text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${gridCols === 4 ? 'bg-charcoal text-white' : 'text-charcoal/40 hover:text-charcoal'}`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
              
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-gold/20 px-5 py-2.5 pr-10 text-sm font-body text-charcoal focus:outline-none focus:border-gold cursor-pointer transition-colors duration-300"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-10">
            {/* Sidebar Filters */}
            <aside className={`${filterOpen ? 'fixed inset-0 z-50 bg-ivory p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-60 lg:shrink-0`}>
              <div className="flex items-center justify-between lg:hidden mb-8">
                <h3 className="font-display text-xl font-semibold">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="w-10 h-10 flex items-center justify-center text-charcoal">
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-10">
                <h4 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-5 text-charcoal">Category</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left py-3 px-4 text-sm font-body transition-all duration-300 flex justify-between items-center ${
                        selectedCategory === cat.id
                          ? 'text-gold bg-gold/5 border-l-2 border-gold'
                          : 'text-charcoal/70 hover:text-gold hover:bg-gold/5'
                      }`}
                    >
                      {cat.name}
                      <span className="text-xs text-warm-gray">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-10">
                <h4 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-5 text-charcoal">Gender</h4>
                <div className="space-y-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'unisex', label: 'Unisex' },
                    { id: 'men', label: 'Men' },
                    { id: 'women', label: 'Women' },
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`w-full text-left py-3 px-4 text-sm font-body transition-all duration-300 ${
                        selectedGender === g.id
                          ? 'text-gold bg-gold/5 border-l-2 border-gold'
                          : 'text-charcoal/70 hover:text-gold hover:bg-gold/5'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-10">
                <h4 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-5 text-charcoal">Price Range</h4>
                <div className="space-y-1">
                  {[
                    { label: 'All Prices', range: [0, 100] as [number, number] },
                    { label: 'Under €25', range: [0, 25] as [number, number] },
                    { label: '€25 — €35', range: [25, 35] as [number, number] },
                    { label: '€35 — €45', range: [35, 45] as [number, number] },
                    { label: 'Over €45', range: [45, 100] as [number, number] },
                  ].map(({ label, range }) => (
                    <button
                      key={label}
                      onClick={() => setPriceRange(range)}
                      className={`w-full text-left py-3 px-4 text-sm font-body transition-all duration-300 ${
                        priceRange[0] === range[0] && priceRange[1] === range[1]
                          ? 'text-gold bg-gold/5 border-l-2 border-gold'
                          : 'text-charcoal/70 hover:text-gold hover:bg-gold/5'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Apply Button */}
              <button
                onClick={() => setFilterOpen(false)}
                className="lg:hidden w-full bg-charcoal text-white py-4 text-sm uppercase tracking-[0.15em] font-body font-medium hover:bg-gold transition-colors duration-300"
              >
                Apply Filters
              </button>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-display text-2xl text-charcoal/30 mb-3">No fragrances found</p>
                  <p className="text-sm text-warm-gray font-body">Try adjusting your filters</p>
                </div>
              ) : (
                <div className={`grid grid-cols-2 gap-5 md:gap-6 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                  {filteredProducts.map((product, idx) => (
                    <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${0.05 * idx}s`, animationFillMode: 'forwards' }}>
                      <ProductCard product={product} onViewProduct={onViewProduct} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
