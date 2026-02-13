'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Plushies',
        imageUrl: '',
        glbModelUrl: '',
        stock: '0',
        stockCount: '0' // Handling potential naming mismatch
    });

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.success) {
                    const p = data.product;
                    setFormData({
                        name: p.name,
                        description: p.description,
                        price: p.price.toString(),
                        category: p.category,
                        imageUrl: p.images && p.images[0] ? p.images[0] : '',
                        glbModelUrl: p.glbModelUrl || '',
                        stock: p.stock.toString(),
                        stockCount: p.stock.toString()
                    });
                } else {
                    alert('Product not found');
                    router.push('/admin/dashboard/products');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock),
                    images: formData.imageUrl ? [formData.imageUrl] : []
                }),
            });

            if (res.ok) {
                router.push('/admin/dashboard/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center bg-card rounded-2xl">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-3xl shadow-sm border border-border">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Price ($)</label>
                        <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Stock</label>
                        <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="Plushies">Plushies</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Accessories">Accessories</option>
                        <option value="HomeDecor">Home Decor</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea required name="description" rows={4} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Image URL</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">3D Model URL (.glb)</label>
                    <input name="glbModelUrl" value={formData.glbModelUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70"
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
}
