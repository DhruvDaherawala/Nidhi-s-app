'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            alert('Error deleting product');
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-foreground">Products</h1>
                <Link
                    href="/admin/dashboard/products/new"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-5 h-5" /> Add New
                </Link>
            </div>

            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/30">
                        <tr>
                            <th className="p-4 font-bold text-muted-foreground">Name</th>
                            <th className="p-4 font-bold text-muted-foreground">Category</th>
                            <th className="p-4 font-bold text-muted-foreground">Price</th>
                            <th className="p-4 font-bold text-muted-foreground">Stock</th>
                            <th className="p-4 font-bold text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No products found.</td></tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="border-t border-border hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4 text-muted-foreground">{product.category}</td>
                                    <td className="p-4 font-bold text-primary">${product.price}</td>
                                    <td className="p-4 text-muted-foreground">{product.stock}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(product._id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors inline-block ml-2">
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
