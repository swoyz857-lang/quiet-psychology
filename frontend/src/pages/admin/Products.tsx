import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api';
import { formatPrice, generateSlug } from '../../lib/utils';
import { Search, Plus, Edit2, Trash2, FileText, Image as ImageIcon, DollarSign, Tag } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import type { Product, ProductInput } from '../../types';

const DEFAULT_PRODUCT: ProductInput = {
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  shortDescription: '',
  price: 2900,
  comparePrice: 144900,
  stock: 8463,
  lemonsqueezyVariantId: '',
  lemonsqueezyProductId: '',
  coverImage: '/covers/new-publication.svg',
  pdfUrl: '/api/downloads/new-publication/pdf',
  epubUrl: '/api/downloads/new-publication/epub',
  visibility: 'visible',
  featured: 0,
  metaTitle: '',
  metaDescription: '',
};

const TABS = [
  { id: 'basic', label: 'Basic', icon: FileText },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'files', label: 'Files', icon: ImageIcon },
  { id: 'seo', label: 'SEO', icon: Tag },
  { id: 'lemonsqueezy', label: 'LemonSqueezy', icon: DollarSign },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductInput>(DEFAULT_PRODUCT);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const load = () => {
    api.products
      .listAll()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) =>
      p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
    );
  }, [products, search]);

  const openNew = () => {
    setEditing(null);
    setForm(DEFAULT_PRODUCT);
    setActiveTab('basic');
    setIsOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      slug: product.slug,
      title: product.title,
      subtitle: product.subtitle,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      comparePrice: product.comparePrice,
      stock: product.stock,
      lemonsqueezyVariantId: product.lemonsqueezyVariantId || '',
      lemonsqueezyProductId: product.lemonsqueezyProductId || '',
      coverImage: product.coverImage,
      pdfUrl: product.pdfUrl,
      epubUrl: product.epubUrl,
      visibility: product.visibility,
      featured: product.featured,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
    });
    setActiveTab('basic');
    setIsOpen(true);
  };

  const save = async () => {
    const data = { ...form };
    if (!data.slug) data.slug = generateSlug(data.title);
    if (!data.metaTitle) data.metaTitle = `${data.title} | Quiet Psychology`;
    if (!data.metaDescription) data.metaDescription = data.shortDescription;

    if (editing) {
      await api.products.update(editing.id, data);
    } else {
      await api.products.create(data);
    }
    setIsOpen(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await api.products.delete(id);
    load();
  };

  if (loading) return <p className="text-muted-gray">Loading products...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-muted-white">Products</h1>
        <Button onClick={openNew}>
          <Plus size={18} className="mr-1.5" /> New Product
        </Button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-gray" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 bg-charcoal border border-white/10 pl-11 pr-4 py-3 text-muted-white placeholder:text-muted-gray focus:border-soft-gold/50 focus:outline-none"
        />
      </div>

      <div className="bg-charcoal border border-white/5 overflow-hidden overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-gray">
            <tr>
              <th className="px-4 md:px-6 py-4">Product</th>
              <th className="px-4 md:px-6 py-4">Price</th>
              <th className="px-4 md:px-6 py-4">Stock</th>
              <th className="px-4 md:px-6 py-4">Status</th>
              <th className="px-4 md:px-6 py-4">LemonSqueezy</th>
              <th className="px-4 md:px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.coverImage} alt={p.title} className="w-10 h-14 object-cover rounded-sm bg-white/5" />
                    <div>
                      <p className="text-muted-white font-medium">{p.title}</p>
                      <p className="text-muted-gray text-xs">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 text-soft-gold">{formatPrice(p.price)}</td>
                <td className="px-4 md:px-6 py-4 text-muted-gray">{p.stock?.toLocaleString('en-US')}</td>
                <td className="px-4 md:px-6 py-4">
                  <Badge variant={p.visibility === 'visible' ? 'gold' : 'outline'}>
                    {p.visibility}
                  </Badge>
                </td>
                <td className="px-4 md:px-6 py-4 text-muted-gray text-xs truncate max-w-[120px]" title={p.lemonsqueezyVariantId || ''}>
                  {p.lemonsqueezyVariantId ? (
                    <span className="text-soft-gold">Connected</span>
                  ) : (
                    <span className="text-red-400">Missing</span>
                  )}
                </td>
                <td className="px-4 md:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => openEdit(p)} className="p-2 text-muted-gray hover:text-soft-gold transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => remove(p.id)} className="p-2 text-muted-gray hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-gray text-sm">No products found.</div>
        )}
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit Product' : 'New Product'}>
        <div className="space-y-5">
          <div className="flex overflow-x-auto no-scrollbar gap-1 border-b border-white/10 pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-soft-gold border-b border-soft-gold'
                    : 'text-muted-gray hover:text-muted-white'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
            {activeTab === 'basic' && (
              <>
                <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
                <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <div>
                  <label className="mb-2 block text-sm font-medium tracking-wide text-muted-gray">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full bg-charcoal border border-white/10 px-4 py-3 text-muted-white focus:border-soft-gold/50 focus:outline-none"
                  />
                </div>
                <Input label="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={form.visibility}
                    onChange={(e) => setForm({ ...form, visibility: e.target.value as 'visible' | 'hidden' })}
                    className="bg-charcoal border border-white/10 px-4 py-3 text-muted-white"
                  >
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                  <Input label="Featured Order" type="number" value={form.featured} onChange={(e) => setForm({ ...form, featured: Number(e.target.value) })} />
                </div>
              </>
            )}

            {activeTab === 'pricing' && (
              <>
                <Input label="Price (cents)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                <Input label="Compare Price (cents)" type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: Number(e.target.value) })} />
                <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
              </>
            )}

            {activeTab === 'files' && (
              <>
                <Input label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
                {form.coverImage && (
                  <img src={form.coverImage} alt="Cover preview" className="w-20 h-28 object-cover rounded-sm bg-white/5" />
                )}
                <Input label="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} />
                <Input label="EPUB URL" value={form.epubUrl} onChange={(e) => setForm({ ...form, epubUrl: e.target.value })} />
              </>
            )}

            {activeTab === 'seo' && (
              <>
                <Input label="Meta Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
                <div>
                  <label className="mb-2 block text-sm font-medium tracking-wide text-muted-gray">Meta Description</label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    rows={3}
                    className="w-full bg-charcoal border border-white/10 px-4 py-3 text-muted-white focus:border-soft-gold/50 focus:outline-none"
                  />
                </div>
              </>
            )}

            {activeTab === 'lemonsqueezy' && (
              <>
                <Input label="LemonSqueezy Variant ID" value={form.lemonsqueezyVariantId || ''} onChange={(e) => setForm({ ...form, lemonsqueezyVariantId: e.target.value })} />
                <Input label="LemonSqueezy Product ID" value={form.lemonsqueezyProductId || ''} onChange={(e) => setForm({ ...form, lemonsqueezyProductId: e.target.value })} />
                <p className="text-xs text-muted-gray">
                  Required for checkout. Find these in your LemonSqueezy dashboard under Products → Variants.
                </p>
              </>
            )}
          </div>

          <Button onClick={save} className="w-full">
            {editing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
