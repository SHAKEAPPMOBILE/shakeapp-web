import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Venue data
const venues: Record<string, { name: string; address: string }> = {
  boston: { name: 'Sweetgreen', address: '659 Boylston Street, Back Bay' },
  dallas: { name: 'Sweetgreen', address: '3636 McKinney Avenue' },
  'los-angeles': { name: "The Butcher's Daughter", address: '1205 Abbot Kinney Boulevard, Venice' },
  'san-francisco': { name: 'Souvla', address: '511;517;519;525;529 Hayes Street, Western Addition' },
  innsbruck: { name: 'Ludwig (Das Burger Restaurant)', address: '3 Museumstraße, Innenstadt' },
  vienna: { name: 'Karma Food', address: '17 Schottenring, Innere Stadt' },
  basel: { name: 'La Manufacture', address: 'Elisabethenstrasse, Vorstädte' },
  geneva: { name: 'Birdie Food & Coffee', address: '40 Rue des Bains, Jonction' },
  zurich: { name: 'Beetnut', address: '16b Lagerstrasse, Kreis 4' },
  cork: { name: 'Café Paradiso', address: '16 Lancaster Quay' },
  dublin: { name: 'Brother Hubbard', address: '153 Capel Street' },
  edinburgh: { name: 'Hula Juice Bar and Gallery', address: '103,105 West Bow, Old Town' },
  hamburg: { name: 'dean&david', address: '40 Ballindamm, Altstadt' },
  lyon: { name: 'Le Kitchen', address: 'Rue Sébastien Gryphe, 7th Arrondissement' },
  paris: { name: 'Wild & The Moon', address: 'Rue Charlot, 3rd Arrondissement' },
  florence: { name: 'Shake Café', address: 'Via Camillo Cavour, Quartiere 1' },
  milan: { name: "That's Vapore", address: 'Piazza Gae Aulenti, Municipio 9' },
  rome: { name: 'Ginger', address: '43/44 Via Borgognona, Municipio Roma I' },
  barcelona: { name: 'Honest Greens', address: '3 Rambla de Catalunya, Eixample' },
  madrid: { name: 'Honest Greens', address: '89 Paseo de la Castellana, Tetuán' },
  lisbon: { name: 'Honest Greens', address: '52C Rua Rodrigues Sampaio, Santo António' },
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_email;
    const customerName = session.metadata?.name;
    const city = session.metadata?.city;

    if (!customerEmail || !city) {
      console.error('Missing customer email or city in metadata');
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const venue = venues[city.toLowerCase()];

    if (!venue) {
      console.error('Venue not found for city:', city);
      return NextResponse.json({ error: 'Venue not found' }, { status: 400 });
    }

    // Send email with venue details
    try {
      await resend.emails.send({
        from: 'Shake <onboarding@resend.dev>',
        to: customerEmail,
        subject: 'SHAKE Community Dinner this Saturday at 7 PM!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #5eead4 0%, #a78bfa 50%, #f87171 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; }
                .header h1 { color: white; margin: 0; font-size: 28px; }
                .header h2 { color: white; margin: 10px 0 0 0; font-size: 20px; font-weight: normal; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
                .greeting { font-size: 18px; margin-bottom: 20px; }
                .intro { margin-bottom: 25px; line-height: 1.8; }
                .venue-box { background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #a78bfa; }
                .detail-row { margin: 12px 0; font-size: 16px; }
                .detail-label { font-weight: bold; color: #1f2937; }
                .venue-name { font-size: 20px; font-weight: bold; color: #1f2937; }
                .venue-address { color: #6b7280; font-size: 16px; margin-top: 8px; }
                .cta { margin: 25px 0; font-size: 16px; }
                .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 15px; }
                .footer-signature { margin-top: 15px; font-style: italic; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>SHAKE Community Dinner this Saturday at 7 PM!</h1>
                  <h2>Let's Shake Things Up Over Dinner</h2>
                </div>
                <div class="content">
                  <div class="greeting">
                    <strong>Hey ${customerName || 'there'},</strong>
                  </div>

                  <div class="intro">
                    <p>Ready to meet new people and share good vibes?</p>
                    <p>Join us this Saturday at 7 PM for our <strong>SHAKE Community Dinner</strong> — an evening of great food, laughter, and connection with fellow Shakers.</p>
                  </div>

                  <div class="venue-box">
                    <div class="detail-row">
                      <span class="detail-label">⏰ When:</span> Next Saturday 7 PM
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">📍 Where:</span>
                      <div class="venue-name">${venue.name}</div>
                      <div class="venue-address">${venue.address}</div>
                    </div>
                  </div>

                  <div class="cta">
                    <p><strong>Meet your group → Enjoy dinner and good company</strong></p>
                  </div>

                  <p>We can't wait to see you shaking up the weekend with us!</p>

                  <div class="footer">
                    <p class="footer-signature">With good vibes,<br>The SHAKE Team ✨</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      console.log('Email sent successfully to:', customerEmail);
    } catch (error) {
      console.error('Failed to send email:', error);
      // Don't return error - webhook should still succeed
    }
  }

  return NextResponse.json({ received: true });
}
