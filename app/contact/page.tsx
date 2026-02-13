'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, InstagramIcon } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    }

    return (
        <div className="min-h-screen py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold text-primary mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground">Have a custom request or question? We'd love to hear from you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                    {/* Info */}
                    <div className="p-12 bg-secondary/10 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-8 text-foreground">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Us</p>
                                    <p className="font-medium text-foreground">nidhisolanki2571@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Call Us</p>
                                    <p className="font-medium text-foreground">+91 89058 66644</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Visit Us</p>
                                    <p className="font-medium text-foreground">81, Ramnagar 1, Udhna, Surat</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                    <InstagramIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Visit Page</p>
                                    <p className="font-medium text-foreground"><a href='https://www.instagram.com/kaahnuri_by_nidhii'>@kaahnuri_by_nidhii</a></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Form */}
                    <div className="p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Name</label>
                                    <input required className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Email</label>
                                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Subject</label>
                                <input className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Custom Order Request" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Message</label>
                                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your dream crochet piece..." />
                            </div>

                            <button
                                disabled={status === 'loading' || status === 'success'}
                                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : (
                                    <>Send Message <Send className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
