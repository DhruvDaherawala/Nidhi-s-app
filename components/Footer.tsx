import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-muted/30 pt-16 pb-8 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-primary">The Enchanted Stitchbook</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Handcrafted with love and passion. Bringing warmth and elegance to your life, one stitch at a time.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://www.instagram.com/kaahnuri_by_nidhii" className="text-foreground/60 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="mailto:[nidhisolanki2571@gmail.com]" className="text-foreground/60 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
                        <a href="tel:+918905866644" className="text-foreground/60 hover:text-primary transition-colors"><Phone className="w-5 h-5" /></a>
                    </div>
                </div>

                {/* Shop */}
                <div>
                    <h4 className="font-bold text-foreground mb-6">Shop</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/products?category=bags" className="hover:text-primary transition-colors">Bags</Link></li>
                        <li><Link href="/products?category=tops" className="hover:text-primary transition-colors">Tops</Link></li>
                        <li><Link href="/products?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                        <li><Link href="/products?category=crochet-flowers" className="hover:text-primary transition-colors">Crochet Flowers</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-bold text-foreground mb-6">Company</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="/story" className="hover:text-primary transition-colors">Story</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold text-foreground mb-6">Contact Us</h4>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                        <li className="flex items-start">
                            <MapPin className="w-5 h-5 mr-3 text-primary shrink-0" />
                            <span>81, Ramnagar 1, Udhna, Surat</span>
                        </li>
                        <li className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                            <span>+91 89058 66644</span>
                        </li>
                        <li className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                            <span>nidhisolanki2571@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} The Enchanted Stitchbook. All rights reserved.
            </div>
        </footer>
    );
}
