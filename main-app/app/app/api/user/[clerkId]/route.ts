import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: NextRequest,{ params }: { params: { clerkId: string } }) {
  try {
    params = await params
    const user = await prisma.user.findUnique({
      where: { clerk_id: params.clerkId },
      select: {
        id: true,
        clerk_id: true,
        email: true,
        full_name: true,
        first_name: true,
        last_name: true,
        profile_image_url: true,
        createdAt: true,
      },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}