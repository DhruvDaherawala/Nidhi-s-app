import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const query = category ? { category } : {};
        const products = await Product.find(query).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error('Fetch products error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();

        // Auth Check
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }

        const product = await Product.create(body);

        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
