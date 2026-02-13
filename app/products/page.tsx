'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-4">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Browse our handcrafted selection of crochet treasures.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl">
            <p className="text-2xl text-muted-foreground">Shop will be updated soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl overflow-hidden border border-border group hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-muted/50 relative overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      '🧶'
                    )}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-serif text-foreground line-clamp-1">{product.name}</h3>
                    <span className="text-primary font-bold text-lg">${product.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{product.description}</p>
                  <button className="w-full py-3 bg-secondary/20 hover:bg-secondary/40 text-foreground font-semibold rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
