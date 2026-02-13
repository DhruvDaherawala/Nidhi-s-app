import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    await dbConnect();
    const products = await Product.find({}).select('_id updatedAt');

    const productUrls = products.map((product) => ({
        url: `https://enchantstitch.com/products/${product._id}`,
        lastModified: product.updatedAt || new Date(),
    }));

    return [
        {
            url: 'https://enchantstitch.com',
            lastModified: new Date(),
        },
        {
            url: 'https://enchantstitch.com/products',
            lastModified: new Date(),
        },
        {
            url: 'https://enchantstitch.com/gallery',
            lastModified: new Date(),
        },
        {
            url: 'https://enchantstitch.com/contact',
            lastModified: new Date(),
        },
        ...productUrls,
    ];
}
