'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function StoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 animate-fadeIn">
            <Link href="/" className="flex items-center gap-2 mb-6" style={{ color: '#704a3e' }}>
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#704a3e' }}>
              Our Story
            </h1>
          </div>

          {/* Story Content */}
          <div className="space-y-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#704a3e' }}>
                The Beginning
              </h2>
              <p style={{ color: '#666' }} className="leading-relaxed">
                Every great craft begins with a passion. What started as a simple hobby—one hook, one thread, and endless imagination—has blossomed into The Enchanted Stitchbook. Each piece we create carries the warmth of handmade artistry and the dedication of countless hours of careful work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#704a3e' }}>
                The Philosophy
              </h2>
              <p style={{ color: '#666' }} className="leading-relaxed">
                We believe in the power of slow craftsmanship. In a world of mass production, we choose to create pieces that last, that tell stories, and that connect maker to owner. Every stitch is placed with intention. Every color is chosen with care. Our crochet isn't just a product—it's a form of meditation, art, and love woven into tangible beauty.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#704a3e' }}>
                What Makes Us Unique
              </h2>
              <ul className="space-y-3">
                {[
                  'Handcrafted with premium, sustainable materials',
                  'Custom orders welcome for your perfect piece',
                  'Each item is one-of-a-kind or limited edition',
                  'Attention to detail in every single stitch',
                  'Created with joy, packaged with care',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4" style={{ color: '#666' }}>
                    <span style={{ color: '#a08b32' }}>✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#704a3e' }}>
                Join the Journey
              </h2>
              <p style={{ color: '#666' }} className="leading-relaxed mb-6">
                When you choose The Enchanted Stitchbook, you're not just purchasing an item—you're supporting a tradition, investing in quality, and becoming part of a community that values artisanship and beauty.
              </p>
              <Link
                href="/gallery"
                className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300"
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
                Explore Our Collection
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
