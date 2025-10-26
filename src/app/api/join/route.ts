import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, country, city } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // 📒 In real life: save to database, send to webhook, write to a file, or send to an external API.
    console.log('📝 New SHAKE signup:', { name, email, country, city });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/join:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
