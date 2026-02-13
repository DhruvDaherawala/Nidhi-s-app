import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`Loading .env from: ${envPath}`);
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

// Inline Product Schema
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    glbModelUrl: { type: String },
    category: { type: String, default: 'General' },
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError if it's already compiled
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const sampleProducts = [
  {
    name: "Handmade Crochet Crop Top",
    description: "Beautifully handcrafted cotton crop top with intricate floral patterns. Perfect for summer festivals and beach days. Made with 100% soft cotton yarn.",
    price: 45.99,
    images: ["/imgs/crochet-top-1.jpg", "/imgs/crochet-top-2.jpg"],
    category: "Clothing",
    stock: 15,
  },
  {
    name: "Cozy Granny Square Blanket",
    description: "Traditional granny square blanket with a modern twist. Features a vibrant pastel color palette. Size: 50x60 inches.",
    price: 120.00,
    images: ["/imgs/blanket-1.jpg"],
    category: "Home Decor",
    stock: 5,
  },
  {
    name: "Amigurumi Cute Bear",
    description: "Adorable handmade amigurumi bear plushie. Safe for children and makes a perfect gift. Height: 20cm.",
    price: 35.50,
    images: ["/imgs/bear-1.jpg"],
    category: "Toys",
    stock: 20,
  },
  {
    name: "Boho Fringe Bag",
    description: "Stylish crochet bag with fringe details. Spacious enough for your daily essentials. Features a sturdy strap and button closure.",
    price: 55.00,
    images: ["/imgs/bag-1.jpg"],
    category: "Accessories",
    stock: 10,
  },
  {
    name: "Floral Bucket Hat",
    description: "Trendy crochet bucket hat with daisy motifs. One size fits most.Available in multiple color combinations.",
    price: 28.00,
    images: ["/imgs/hat-1.jpg"],
    category: "Accessories",
    stock: 25,
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
    console.log('Connected to MongoDB.');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    console.log('Inserting sample products...');
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully!');

    console.log('Verifying insertion...');
    const count = await Product.countDocuments();
    console.log(`Total products in database: ${count}`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
