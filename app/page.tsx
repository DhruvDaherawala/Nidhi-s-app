'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 25,
          y: (e.clientY - rect.top - rect.height / 2) / 25,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5ede3 0%, #f9f4ed 100%)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(245, 237, 227, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#704a3e' }}>
            ✦ The Enchanted Stitchbook
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#704a3e' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            {[
              { name: 'Gallery', href: '/gallery' },
              { name: 'Products', href: '/products' },
              { name: 'Story', href: '/story' },
              { name: 'Contact', href: '#' },
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

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 md:hidden p-4 flex flex-col gap-4" style={{ backgroundColor: 'rgba(245, 237, 227, 0.98)' }}>
              {[
                { name: 'Gallery', href: '/gallery' },
                { name: 'Products', href: '/products' },
                { name: 'Story', href: '/story' },
                { name: 'Contact', href: '#' },
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

      {/* Hero Section with 3D Model */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#704a3e' }}>
                Where Timeless Craft Meets Magical Presentation
              </h1>
              <p className="text-lg mb-8" style={{ color: '#666' }}>
                Welcome to a treasured collection of handcrafted crochet pieces. Each stitch tells a story of dedication, artistry, and love for the craft.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/gallery"
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
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
                  Explore Gallery
                </Link>
                <Link
                  href="/story"
                  className="px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300"
                  style={{
                    borderColor: '#704a3e',
                    color: '#704a3e',
                  }}
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Rotating 3D Model Display */}
            <div ref={containerRef} className="relative h-96 flex items-center justify-center">
              <div
                className="w-64 h-64 rounded-full flex items-center justify-center shadow-2xl animate-float"
                style={{
                  backgroundColor: '#8b6f5f',
                  transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🧵</div>
                  <p className="text-white text-sm">3D Product Preview</p>
                  <p className="text-white text-xs mt-2 opacity-75">Move mouse to rotate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Section */}
          <div className="mt-24">
            <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#704a3e' }}>
              Featured Collection
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Handmade Purses',
                  desc: 'Beautifully crafted bags with intricate stitching',
                  icon: '👜',
                },
                {
                  title: 'Flower Arrangements',
                  desc: 'Eternal blooms that never wilt or fade',
                  icon: '🌹',
                },
                {
                  title: 'Amigurumi Art',
                  desc: 'Adorable crocheted creatures and characters',
                  icon: '🧶',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-lg backdrop-blur-sm animate-fadeIn"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    animationDelay: `${0.3 + idx * 0.2}s`,
                    border: '1px solid rgba(112, 74, 62, 0.2)',
                  }}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#704a3e' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#666' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: 'rgba(112, 74, 62, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p style={{ color: '#704a3e' }}>
            © 2025 The Enchanted Stitchbook. Handcrafted with love.
          </p>
        </div>
      </footer>
    </div>
  );
}
