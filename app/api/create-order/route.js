import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const amount = parseFloat(requestBody.amount);

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Convert to paise (smallest currency unit for INR)
    const amountInPaise = Math.round(amount * 100);

    // Minimum amount check (₹1)
    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: 'Minimum payment amount is ₹1' },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}