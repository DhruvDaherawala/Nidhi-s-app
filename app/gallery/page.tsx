'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    { title: 'Emerald Dream Purse', category: 'Purses', emoji: '💚' },
    { title: 'Rose Blossom', category: 'Flowers', emoji: '🌹' },
    { title: 'Ocean Waves Blanket', category: 'Blankets', emoji: '🌊' },
    { title: 'Amigurumi Bunny', category: 'Amigurumi', emoji: '🐰' },
    { title: 'Sunset Collection', category: 'Purses', emoji: '🧡' },
    { title: 'Lavender Garden', category: 'Flowers', emoji: '💜' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5ede3 0%, #f9f4ed 100%)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-sm" style={{ backgroundColor: 'rgba(245, 237, 227, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold" style={{ color: '#704a3e' }}>
            ✦ Enchanted Stitchbook
          </Link>
          
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#704a3e' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8">
            {[
              { name: 'Gallery', href: '/gallery' },
              { name: 'Products', href: '/products' },
              { name: 'Story', href: '/story' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-all duration-300 hover:opacity-70"
                style={{ color: '#704a3e' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 md:hidden p-4 flex flex-col gap-4" style={{ backgroundColor: 'rgba(245, 237, 227, 0.98)' }}>
              {[
                { name: 'Gallery', href: '/gallery' },
                { name: 'Products', href: '/products' },
                { name: 'Story', href: '/story' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{ color: '#704a3e' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fadeIn">
            <Link href="/" className="flex items-center gap-2 mb-6" style={{ color: '#704a3e' }}>
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#704a3e' }}>
              The Gallery
            </h1>
            <p style={{ color: '#666' }} className="text-lg">
              Turn through the pages of our scrapbook. Each piece is a testament to the beauty of handmade artistry.
            </p>
          </div>

          {/* Scrapbook-style Gallery */}
          <div className="grid md:grid-cols-3 gap-8 auto-rows-max">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => setSelectedImage(idx)}
              >
                <div
                  className="relative rounded-sm overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-rotate-1"
                  style={{
                    backgroundColor: 'white',
                    padding: '16px',
                    boxShadow: '0 8px 24px rgba(112, 74, 62, 0.15)',
                    aspectRatio: idx % 3 === 1 ? '1 / 1.2' : '1 / 1',
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center rounded text-6xl"
                    style={{ backgroundColor: '#f0e8df' }}
                  >
                    {item.emoji}
                  </div>
                </div>
                <p className="mt-4 font-semibold" style={{ color: '#704a3e' }}>
                  {item.title}
                </p>
                <p style={{ color: '#999' }} className="text-sm">
                  {item.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-7xl text-center mb-6">
              {galleryItems[selectedImage].emoji}
            </div>
            <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#704a3e' }}>
              {galleryItems[selectedImage].title}
            </h2>
            <p className="text-center mb-6" style={{ color: '#999' }}>
              {galleryItems[selectedImage].category}
            </p>
            <p style={{ color: '#666' }} className="text-center mb-8">
              Each piece is meticulously crafted with attention to every detail. This is a unique handmade creation.
            </p>
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full py-3 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: '#704a3e',
                color: '#f5ede3',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
