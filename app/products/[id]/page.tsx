import Link from 'next/link';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Product3DViewer from '@/components/Product3DViewer';

// Note: In Next.js 15+, params is async.
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    let product;
    try {
        product = await Product.findById(id);
    } catch (e) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-muted-foreground hover:text-primary underline">Back to Shop</Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
                    <Link href="/products" className="text-muted-foreground hover:text-primary underline">Back to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <Link href="/products" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Product Media */}
                    <div className="space-y-8">
                        <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-border flex items-center justify-center relative">
                            {product.images && product.images.length > 0 ? (
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-8xl">🧸</span>
                            )}
                        </div>

                        {product.glbModelUrl && (
                            <div className="bg-white rounded-3xl p-4 border border-border shadow-sm">
                                <h3 className="font-bold text-center mb-4 text-muted-foreground">3D View</h3>
                                <Product3DViewer modelUrl={product.glbModelUrl} />
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{product.name}</h1>
                        <div className="text-3xl font-bold text-primary mb-6">${product.price}</div>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20 mb-8">
                            <h3 className="font-bold mb-2 flex items-center"><span className="mr-2">✨</span> Handmade to Order</h3>
                            <p className="text-sm text-muted-foreground">
                                Each piece is lovingly handcrafted just for you. Please allow 1-2 weeks for creation and delivery.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3">
                                <ShoppingBag className="w-5 h-5" /> Request Order
                            </button>
                            <button className="px-6 py-4 border border-border rounded-xl hover:bg-muted transition-colors">
                                Save
                            </button>
                        </div>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            * Payment and shipping details will be discussed after order request.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
