const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@crochet.com';
        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });

        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seed();
