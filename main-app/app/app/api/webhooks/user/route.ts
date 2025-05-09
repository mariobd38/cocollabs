import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name, external_accounts } = event.data;

      const email = email_addresses[0]?.email_address;
      const profile_image = external_accounts[0]?.image_url;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            clerk_id: id,
            email,
            full_name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
            first_name: first_name ?? null,
            last_name: last_name ?? null,
            password: null,
            profile_image_url: profile_image
          },
        });

        return NextResponse.json({ message: 'User created in Supabase' }, { status: 200 });
      } else {
        console.log(`User with email ${email} already exists — skipping creation.`);
      }
    }

    return NextResponse.json({ message: 'Unhandled event type' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
