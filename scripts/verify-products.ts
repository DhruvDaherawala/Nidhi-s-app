import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function verifyProducts() {
    try {
        await mongoose.connect(MONGODB_URI!, { tls: true, tlsAllowInvalidCertificates: true });
        console.log('Connected to MongoDB');

        const count = await Product.countDocuments();
        console.log(`Total products: ${count}`);

        const products = await Product.find({});
        console.log('Products found:');
        products.forEach(p => {
            console.log(`- ${p.name}: ${p.images.length} images`);
            console.log(`  Images: ${p.images.join(', ')}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error verifying products:', error);
        process.exit(1);
    }
}

verifyProducts();
