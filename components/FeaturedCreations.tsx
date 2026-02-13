'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { products, Product } from '@/data/products';

export default function FeaturedCreations() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // 1. Get all unique categories
        const categories = Array.from(new Set(products.map(p => p.category)));

        // 2. Select 3 random unique categories
        const shuffledCategories = categories.sort(() => 0.5 - Math.random());
        const selectedCategories = shuffledCategories.slice(0, 3);

        // 3. Select 1 random product from each of the selected categories
        const selectedProducts: Product[] = [];

        selectedCategories.forEach(category => {
            const productsByCategory = products.filter(p => p.category === category);
            if (productsByCategory.length > 0) {
                const randomProduct = productsByCategory[Math.floor(Math.random() * productsByCategory.length)];
                selectedProducts.push(randomProduct);
            }
        });

        setFeaturedProducts(selectedProducts);
    }, []);

    // If we haven't selected products yet (client-side only), render a skeleton or null using existing structure to avoid layout shift
    if (featuredProducts.length === 0) {
        return (
            <section className="py-20 px-6 bg-background">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-serif font-bold text-center mb-12 text-primary">Featured Creations</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative aspect-square bg-muted/30 rounded-3xl overflow-hidden border border-border animate-pulse">
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-serif font-bold text-center mb-12 text-primary">Featured Creations</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="group relative aspect-square bg-muted/30 rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all">
                            {/* Image or Placeholder */}
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                                    🧸
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                                <h3 className="text-xl font-bold line-clamp-1">{product.name}</h3>
                                {/* Price removed as per gallery logic for now, or we can keep it if price > 0 */}
                                {product.price > 0 && (
                                    <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                                )}
                                <p className="text-muted-foreground text-sm line-clamp-1">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/gallery" className="inline-block px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
