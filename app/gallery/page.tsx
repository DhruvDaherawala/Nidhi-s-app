'use client';

import { motion } from 'framer-motion';
import { products, Product } from '@/data/products';

export default function GalleryPage() {
  // Group products by category
  const categories: { [key: string]: Product[] } = {};

  // Define the order of categories as requested
  const categoryOrder = [
    'Handmade Bag',
    'Crochet Flower Bouquet',
    'Crochet Leg Warmers',
    'Crochet Top',
    'Accessory'
  ];

  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  return (
    <div className="min-h-screen py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-4">Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handcrafted collection, categorized for your browsing pleasure.
          </p>
        </div>

        <div className="space-y-20">
          {categoryOrder.map((categoryName) => {
            const categoryProducts = categories[categoryName];
            if (!categoryProducts) return null;

            return (
              <section key={categoryName} className="scroll-mt-24" id={categoryName.toLowerCase().replace(/ /g, '-')}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-serif font-bold text-foreground">{categoryName}</h2>
                  <div className="h-px bg-border flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
                    >
                      <div className="aspect-square relative overflow-hidden bg-muted/50">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-4xl">🧶</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>

                      <div className="p-6">
                        <div className="mb-2">
                          <h3 className="text-xl font-serif font-bold text-foreground line-clamp-1">{product.name}</h3>
                          {/* Price removed as per request */}
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Fallback if no products found at all */}
        {Object.keys(categories).length === 0 && (
          <div className="text-center py-20 bg-muted/30 rounded-3xl">
            <p className="text-2xl text-muted-foreground">No items found in the gallery.</p>
          </div>
        )}

      </div>
    </div>
  );
}
