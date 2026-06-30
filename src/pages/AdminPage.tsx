import { useState } from 'react';
import { Plus, Edit3, Trash2, Package, ShoppingBag, Users, BarChart3, Tag, X, Save, Settings } from 'lucide-react';
import { products as initialProducts, Product } from '../data/products';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers' | 'coupons';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [productList, setProductList] = useState<Product[]>([...initialProducts]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: 'Premium Collection',
    price: '',
    originalPrice: '',
    description: '',
    notes: '',
    sizes: '30ml, 50ml',
    gender: 'unisex' as 'unisex' | 'men' | 'women',
    inStock: true,
    isNew: false,
    isBestSeller: false,
  });

  const resetForm = () => {
    setForm({
      name: '', category: 'Premium Collection', price: '', originalPrice: '', description: '',
      notes: '', sizes: '30ml, 50ml', gender: 'unisex', inStock: true, isNew: false, isBestSeller: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      description: product.description,
      notes: product.notes.join(', '),
      sizes: product.sizes.join(', '),
      gender: product.gender,
      inStock: product.inStock,
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = () => {
    const newProduct: Product = {
      id: editingProduct?.id || form.name.toLowerCase().replace(/\s+/g, '-'),
      name: form.name,
      category: form.category,
      price: parseFloat(form.price) || 0,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      description: form.description,
      notes: form.notes.split(',').map(n => n.trim()).filter(Boolean),
      image: editingProduct?.image || 'https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
      images: editingProduct?.images || ['https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600'],
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
      inStock: form.inStock,
      isNew: form.isNew,
      isBestSeller: form.isBestSeller,
      gender: form.gender,
    };

    if (editingProduct) {
      setProductList(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProductList(prev => [...prev, newProduct]);
    }
    resetForm();
  };

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
  };

  const tabs = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: BarChart3 },
    { id: 'products' as AdminTab, label: 'Products', icon: Package },
    { id: 'orders' as AdminTab, label: 'Orders', icon: ShoppingBag },
    { id: 'customers' as AdminTab, label: 'Customers', icon: Users },
    { id: 'coupons' as AdminTab, label: 'Coupons', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <div className="bg-charcoal text-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-gold" />
            <h1 className="font-display text-lg font-semibold tracking-wider">Admin Dashboard</h1>
          </div>
          <span className="text-xs text-white/40 font-body">Damascus Perfumes Management</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-20 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-charcoal/60 hover:text-charcoal border border-gold/10'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {[
                { label: 'Total Products', value: productList.length, icon: Package, color: 'text-gold' },
                { label: 'Total Orders', value: 47, icon: ShoppingBag, color: 'text-sage' },
                { label: 'Total Customers', value: 132, icon: Users, color: 'text-rose' },
                { label: 'Revenue', value: '€3,420', icon: BarChart3, color: 'text-gold' },
              ].map(stat => (
                <div key={stat.label} className="bg-white p-6 border border-gold/10">
                  <stat.icon size={24} className={`${stat.color} mb-3`} />
                  <p className="font-display text-2xl font-bold text-charcoal">{stat.value}</p>
                  <p className="text-xs text-warm-gray font-body tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 border border-gold/10">
              <h3 className="font-display text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {['New order received — Black Musk (50ml)', 'Customer review added — Royal Oud', 'Product updated — Damascus Rose', 'New subscriber — newsletter signup'].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gold/5 last:border-0">
                    <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                    <p className="text-sm font-body text-charcoal/70">{activity}</p>
                    <span className="text-xs text-warm-gray font-body ml-auto">{i + 1}h ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Products <span className="text-warm-gray font-body text-sm font-normal">({productList.length})</span>
              </h2>
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="bg-charcoal text-white px-5 py-2.5 text-sm font-body tracking-wider flex items-center gap-2 hover:bg-gold transition-colors"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-ivory w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-semibold">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button onClick={resetForm} className="text-warm-gray hover:text-charcoal transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Product Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                        placeholder="e.g. Royal Oud"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Category</label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                        >
                          <option>Premium Collection</option>
                          <option>Musk Collection</option>
                          <option>Oud Collection</option>
                          <option>Bakhoor Collection</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Gender</label>
                        <select
                          value={form.gender}
                          onChange={(e) => setForm({ ...form, gender: e.target.value as 'unisex' | 'men' | 'women' })}
                          className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                        >
                          <option value="unisex">Unisex</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Price (€) *</label>
                        <input
                          type="number"
                          value={form.price}
                          onChange={(e) => setForm({ ...form, price: e.target.value })}
                          className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                          placeholder="37.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Original Price (€)</label>
                        <input
                          type="number"
                          value={form.originalPrice}
                          onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                          className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                          placeholder="45.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Description *</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white resize-none"
                        placeholder="Product description..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Fragrance Notes (comma separated)</label>
                      <input
                        type="text"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                        placeholder="Oud, Rose, Amber, Musk"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-charcoal mb-1.5">Sizes (comma separated)</label>
                      <input
                        type="text"
                        value={form.sizes}
                        onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                        className="w-full px-4 py-3 border border-gold/15 text-sm font-body focus:outline-none focus:border-gold bg-white"
                        placeholder="30ml, 50ml"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal">
                        <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="accent-gold" />
                        In Stock
                      </label>
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal">
                        <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="accent-gold" />
                        New Arrival
                      </label>
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal">
                        <input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="accent-gold" />
                        Best Seller
                      </label>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-charcoal text-white py-3 text-sm uppercase tracking-widest font-body hover:bg-gold transition-colors flex items-center justify-center gap-2"
                      >
                        <Save size={16} />
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 border border-gold/20 text-sm uppercase tracking-widest font-body text-charcoal/60 hover:text-charcoal transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-gold/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream/50 border-b border-gold/10">
                      <th className="text-left px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-charcoal/60">Product</th>
                      <th className="text-left px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-charcoal/60 hidden md:table-cell">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-charcoal/60">Price</th>
                      <th className="text-left px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-charcoal/60 hidden md:table-cell">Status</th>
                      <th className="text-right px-4 py-3 text-xs font-body font-semibold uppercase tracking-wider text-charcoal/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map(product => (
                      <tr key={product.id} className="border-b border-gold/5 hover:bg-cream/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-14 object-cover hidden sm:block" />
                            <div>
                              <p className="text-sm font-display font-medium text-charcoal">{product.name}</p>
                              <p className="text-xs text-warm-gray font-body">Rating: {product.rating} ({product.reviews})</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-body text-charcoal/70 hidden md:table-cell">{product.category}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-display font-semibold">€{product.price.toFixed(2)}</span>
                          {product.originalPrice && <span className="text-xs text-warm-gray line-through ml-2 font-body">€{product.originalPrice.toFixed(2)}</span>}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2 py-1 text-xs font-body ${product.inStock ? 'bg-sage/10 text-sage' : 'bg-rose/10 text-rose'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditForm(product)}
                              className="w-8 h-8 border border-gold/20 flex items-center justify-center text-charcoal/40 hover:text-gold hover:border-gold transition-all"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="w-8 h-8 border border-gold/20 flex items-center justify-center text-charcoal/40 hover:text-rose hover:border-rose transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-gold/10 p-8 text-center">
            <ShoppingBag size={48} className="text-gold/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">Order Management</h3>
            <p className="text-warm-gray text-sm font-body max-w-md mx-auto">
              Orders will appear here as customers make purchases through the store. Track, manage, and fulfill orders from this dashboard.
            </p>
          </div>
        )}

        {/* Customers */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-gold/10 p-8 text-center">
            <Users size={48} className="text-gold/30 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">Customer Management</h3>
            <p className="text-warm-gray text-sm font-body max-w-md mx-auto">
              View customer profiles, order history, and preferences. Build lasting relationships with your fragrance community.
            </p>
          </div>
        )}

        {/* Coupons */}
        {activeTab === 'coupons' && (
          <div>
            <div className="bg-white border border-gold/10 p-6 mb-6">
              <h3 className="font-display text-lg font-semibold text-charcoal mb-4">Active Coupons</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-cream/50 border border-gold/10">
                  <div>
                    <p className="font-display font-semibold text-charcoal">DAMASCUS15</p>
                    <p className="text-xs text-warm-gray font-body">15% off first order</p>
                  </div>
                  <span className="text-xs bg-sage/10 text-sage px-3 py-1 font-body">Active</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-cream/50 border border-gold/10">
                  <div>
                    <p className="font-display font-semibold text-charcoal">FREESHIP50</p>
                    <p className="text-xs text-warm-gray font-body">Free shipping on orders over €50</p>
                  </div>
                  <span className="text-xs bg-sage/10 text-sage px-3 py-1 font-body">Active</span>
                </div>
              </div>
            </div>
            <button className="bg-charcoal text-white px-5 py-2.5 text-sm font-body tracking-wider flex items-center gap-2 hover:bg-gold transition-colors">
              <Plus size={16} />
              Create New Coupon
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
