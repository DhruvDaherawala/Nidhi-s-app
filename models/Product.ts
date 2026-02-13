import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    glbModelUrl: { type: String },
    category: { type: String, default: 'General' },
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
