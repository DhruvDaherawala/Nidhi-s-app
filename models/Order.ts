import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
