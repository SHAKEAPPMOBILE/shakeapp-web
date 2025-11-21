import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (error) {
            // Check for unique constraint violation (error code 23505 for Postgres)
            if (error.code === '23505') {
                return NextResponse.json(
                    { message: 'You are already subscribed!' },
                    { status: 200 }
                );
            }
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to subscribe. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Successfully subscribed!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
