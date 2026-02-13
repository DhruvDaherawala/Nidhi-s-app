'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setRotation({
          x: (e.clientY - rect.top - rect.height / 2) / 30,
          y: (e.clientX - rect.left - rect.width / 2) / 30,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const products = [
    {
      title: 'Emerald Clutch',
      price: '$45',
      emoji: '💚',
      desc: 'Perfectly sized for everyday carry',
    },
    {
      title: 'Rose Garden Set',
      price: '$38',
      emoji: '🌹',
      desc: 'A bouquet that lasts forever',
    },
    {
      title: 'Cozy Throw Blanket',
      price: '$95',
      emoji: '🧶',
      desc: 'Warmth wrapped in artistry',
    },
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
              3D Product Showcase
            </h1>
            <p style={{ color: '#666' }} className="text-lg">
              Explore our most exquisite pieces in interactive 3D. Move your mouse to see every angle of these handcrafted treasures.
            </p>
          </div>

          {/* 3D Product Displays */}
          <div className="grid md:grid-cols-1 gap-16">
            {products.map((product, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn" style={{ animationDelay: `${idx * 0.2}s` }}>
                {/* 3D Model */}
                <div
                  ref={idx === 0 ? containerRef : null}
                  className="h-96 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: '#f0e8df',
                    perspective: '1000px',
                  }}
                >
                  <div
                    className="w-48 h-48 rounded-full flex items-center justify-center text-6xl animate-float"
                    style={{
                      backgroundColor: '#8b6f5f',
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transition: 'transform 0.1s ease-out',
                      boxShadow: '0 20px 40px rgba(112, 74, 62, 0.3)',
                    }}
                  >
                    {product.emoji}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: '#704a3e' }}>
                    {product.title}
                  </h2>
                  <p className="text-2xl font-semibold mb-6" style={{ color: '#a08b32' }}>
                    {product.price}
                  </p>
                  <p style={{ color: '#666' }} className="mb-8 leading-relaxed">
                    {product.desc}
                  </p>
                  <p style={{ color: '#999' }} className="mb-8 text-sm">
                    Each item is handcrafted with premium materials and attention to detail. Production time: 2-3 weeks.
                  </p>
                  <button
                    className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: '#704a3e',
                      color: '#f5ede3',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 25px rgba(167, 139, 50, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Request Custom Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
