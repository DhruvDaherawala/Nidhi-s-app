'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import YarnBallHero from './YarnBallHero';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 lg:py-32">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <span className="inline-block px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-6 border border-primary/20">
                        ✨ Handcrafted with Love
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
                        Cozy Knits for <br />
                        <span className="text-primary italic">Magical Moments</span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                        Discover our collection of bespoke crochet treasures. From Amigurumi plushies to elegant wearables, each piece is stitched with passion and care.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/gallery"
                            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            Show Collection <ArrowRight className="w-5 h-5" />
                        </Link>
                        {/* <Link
                            href="/gallery"
                            className="px-8 py-4 bg-white text-foreground border border-border rounded-full font-semibold hover:bg-muted transition-all"
                        >
                            View Gallery
                        </Link> */}
                    </div>
                </motion.div>

                {/* Visual Content (Placeholder for 3D or Image) */}
                <motion.div
                    initial={{ opacity: 1, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 0.9 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/50 border border-white/50 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700 ease-out">
                        {/* Placeholder for 3D model or Hero Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center">
                            <YarnBallHero />
                        </div>
                    </div>

                    {/* Floating cards */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border/50 max-w-xs"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">🌿</div>
                            <div>
                                <p className="font-bold text-sm">100% Eco-Friendly</p>
                                <p className="text-xs text-muted-foreground">Premium cotton yarn</p>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
