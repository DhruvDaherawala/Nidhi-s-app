'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Plushies',
        imageUrl: '',
        glbModelUrl: '',
        stock: '1'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
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
                alert('Failed to create product');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-3xl shadow-sm border border-border">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Name</label>
                    <input required name="name" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Sleepy Bear" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Price ($)</label>
                        <input required type="number" step="0.01" name="price" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" placeholder="25.00" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Stock</label>
                        <input required type="number" name="stock" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" placeholder="1" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category</label>
                    <select name="category" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none">
                        <option value="Plushies">Plushies</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Accessories">Accessories</option>
                        <option value="HomeDecor">Home Decor</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea required name="description" rows={4} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Describe the product..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Image URL</label>
                    <input name="imageUrl" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">Enter a direct link to an image.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">3D Model URL (.glb)</label>
                    <input name="glbModelUrl" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none" placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">Optional. Link to a GLB/GLTF file.</p>
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-70"
                >
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}
