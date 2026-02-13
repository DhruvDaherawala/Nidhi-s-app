import mongoose from 'mongoose';
import Product from '../models/Product';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface ImageGroup {
  name: string;
  images: string[];
}

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI!, { tls: true, tlsAllowInvalidCertificates: true });
    console.log('Connected to MongoDB');

    const productsDir = path.join(process.cwd(), 'public', 'products');
    const files = fs.readdirSync(productsDir);

    const groups: { [key: string]: string[] } = {};

    files.forEach(file => {
      // Logic to group files.
      // E.g., "bag_1.png", "bag_2.png" -> "bag"

      let baseName = file.split('.')[0];

      // Handle specific known items first
      if (baseName.includes('ear_rings')) {
        baseName = 'ear_rings';
      } else if (baseName.includes('keychain')) {
        baseName = 'keychain';
      } else if (baseName.includes('flower') && !baseName.includes('bouquet')) {
        baseName = 'flower';
      } else {
        // General case: remove numbers and extension
        baseName = baseName.replace(/_\d+$/, '').replace(/\d+$/, '').replace(/\(\d+\)$/, '');
        if (baseName.match(/_\d+$/)) {
          baseName = baseName.replace(/_\d+$/, '');
        }
      }

      if (!groups[baseName]) {
        groups[baseName] = [];
      }
      groups[baseName].push(`/products/${file}`);
    });

    console.log('Found product groups:', Object.keys(groups));

    for (const [name, images] of Object.entries(groups)) {
      // Beautify name: "crochet_tops" -> "Crochet Tops"
      const displayName = name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      const existingProduct = await Product.findOne({ name: displayName });

      if (existingProduct) {
        console.log(`Updating existing product: ${displayName}`);
        existingProduct.images = images;
        await existingProduct.save();
      } else {
        console.log(`Creating new product: ${displayName}`);
        await Product.create({
          name: displayName,
          description: `Handmade ${displayName}`,
          price: 50, // Default price
          images: images,
          category: 'General',
          stock: 10,
        });
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
