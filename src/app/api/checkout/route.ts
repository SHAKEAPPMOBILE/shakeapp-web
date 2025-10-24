import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

// ---- Validate envs early and pin API version
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

if (!STRIPE_SECRET_KEY) {
  // If this is missing, the module would crash in weird ways later.
  throw new Error('Missing STRIPE_SECRET_KEY');
}

//const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, city } = await request.json();

    // Validate input
    if (!name || !email || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!STRIPE_PRICE_ID) {
      return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID' }, { status: 500 });
    }

    // Always use a known base URL (Origin header can be null/empty on some hosts)
    const baseUrl = SITE_URL;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${baseUrl}/?success=true&city=${encodeURIComponent(city)}`,
      cancel_url: `${baseUrl}/`,
      customer_email: email,
      metadata: { name, city },
      // automatic_payment_methods: { enabled: true }, // optional (lets Stripe choose the right methods)
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  }  catch (err: unknown) {
  console.error('Stripe checkout error:', err);

  let errorMessage = 'Failed to create checkout session';
  let type: string | undefined;
  let code: string | undefined;

  if (typeof err === 'object' && err !== null) {
    const e = err as {
      message?: string;
      type?: string;
      code?: string;
      raw?: { message?: string; type?: string; code?: string };
    };
    errorMessage = e.raw?.message ?? e.message ?? errorMessage;
    type = e.raw?.type ?? e.type;
    code = e.raw?.code ?? e.code;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }

  return NextResponse.json({ error: errorMessage, type, code }, { status: 500 });
}
}
