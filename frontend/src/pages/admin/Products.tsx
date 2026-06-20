import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { formatPrice, generateSlug } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
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
  pdfUrl: '/downloads/new-publication.pdf',
  epubUrl: '/downloads/new-publication.epub',
  visibility: 'visible',
  featured: 0,
  metaTitle: '',
  metaDescription: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductInput>(DEFAULT_PRODUCT);
  const [isOpen, setIsOpen] = useState(false);

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

  const openNew = () => {
    setEditing(null);
    setForm(DEFAULT_PRODUCT);
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
      lemonsqueezyVariantId: product.lemonsqueezyVariantId,
      lemonsqueezyProductId: product.lemonsqueezyProductId,
      coverImage: product.coverImage,
      pdfUrl: product.pdfUrl,
      epubUrl: product.epubUrl,
      visibility: product.visibility,
      featured: product.featured,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
    });
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
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-muted-white">Products</h1>
        <Button onClick={openNew}>New Product</Button>
      </div>

      <div className="bg-charcoal border border-white/5 overflow-hidden overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted-gray">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">LemonSqueezy Variant</th>
              <th className="px-6 py-4">Visibility</th>
              <th className="px-6 py-4">Featured</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-muted-white">{p.title}</td>
                <td className="px-6 py-4 text-soft-gold">{formatPrice(p.price)}</td>
                <td className="px-6 py-4 text-soft-gold">{p.stock?.toLocaleString('en-US')}</td>
                <td className="px-6 py-4 text-muted-gray text-xs truncate max-w-[120px]" title={p.lemonsqueezyVariantId || ''}>
                  {p.lemonsqueezyVariantId || '-'}
                </td>
                <td className="px-6 py-4 text-muted-gray capitalize">{p.visibility}</td>
                <td className="px-6 py-4 text-muted-gray">{p.featured}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => openEdit(p)} className="text-soft-gold hover:underline">
                    Edit
                  </button>
                  <button onClick={() => remove(p.id)} className="text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={editing ? 'Edit Product' : 'New Product'}>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
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
            <Input label="Price (cents)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            <Input label="Compare Price (cents)" type="number" value={form.comparePrice} onChange={(e) => setForm({ ...form, comparePrice: Number(e.target.value) })} />
            <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          </div>
          <Input label="LemonSqueezy Variant ID" value={form.lemonsqueezyVariantId || ''} onChange={(e) => setForm({ ...form, lemonsqueezyVariantId: e.target.value })} />
          <Input label="LemonSqueezy Product ID" value={form.lemonsqueezyProductId || ''} onChange={(e) => setForm({ ...form, lemonsqueezyProductId: e.target.value })} />
          <Input label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          <Input label="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} />
          <Input label="EPUB URL" value={form.epubUrl} onChange={(e) => setForm({ ...form, epubUrl: e.target.value })} />
          <Input label="Meta Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
          <Input label="Meta Description" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
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
          <Button onClick={save} className="w-full">
            {editing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
