import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const db = await getDB();
    const shopsCollection = db.collection('shops');
    
    const data = await request.json();

    // Validation
    if (!data.shopName || !data.owner || !data.location || !data.category) {
      return NextResponse.json(
        { error: 'Shop name, owner, location, and category are required' },
        { status: 400 }
      );
    }

    // Add default values
    const shopData = {
      ...data,
      rating: data.rating || 0,
      createdAt: new Date()
    };

    const result = await shopsCollection.insertOne(shopData);

    if (!result.acknowledged) {
      throw new Error('Failed to insert shop');
    }

    return NextResponse.json(
      { 
        message: 'Shop registered successfully', 
        shop: { ...shopData, _id: result.insertedId } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}