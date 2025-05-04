import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = event.data;

      const email = email_addresses[0]?.email_address;

      await prisma.user.create({
        data: {
          clerk_id: id,
          email,
          full_name: `${first_name ?? ''} ${last_name ?? ''}`.trim(),
          password: null
        },
      });

      return NextResponse.json({ message: 'User created in Supabase' });
    }

    return NextResponse.json({ message: 'Unhandled event type' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
