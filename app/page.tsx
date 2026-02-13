import Hero from '@/components/Hero';
import Link from 'next/link';
import FeaturedCreations from '@/components/FeaturedCreations';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Section Placeholder */}
      <FeaturedCreations />

      {/* Story Section */}
      <section id="story" className="py-24 px-6 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-foreground">Stitched with Passion</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-light">
            Every loop, every knot, and every stitch is crafted by hand with the utmost care. We believe in the magic of handmade items—objects that carry the warmth and soul of their creator. From our hands to your home, we bring you cozy elegance.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12 p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
            <div>
              <h3 className="text-4xl font-bold text-primary">500+</h3>
              <p className="text-sm text-foreground/70 uppercase tracking-wide mt-2">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">100%</h3>
              <p className="text-sm text-foreground/70 uppercase tracking-wide mt-2">Handmade</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">50+</h3>
              <p className="text-sm text-foreground/70 uppercase tracking-wide mt-2">Unique Designs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">4.9</h3>
              <p className="text-sm text-foreground/70 uppercase tracking-wide mt-2">Star Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16 text-primary">Kind Words</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Absolutely adorable! The craftsmanship is top-notch.", author: "Rajvi" },
              { quote: "Buying handmade feels so special. Highly recommended!", author: "Rishi" },
              { quote: "The softest yarn and cutest designs. In love!", author: "Ruchi" },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="text-primary text-4xl mb-4 font-serif">"</div>
                <p className="text-muted-foreground mb-6 italic">{t.quote}</p>
                <p className="font-bold text-foreground">- {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
