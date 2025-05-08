import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const installationId = Number(url.searchParams.get('installation_id'));
  const state = url.searchParams.get('state'); // This is the Clerk user ID from the state param

  if (!installationId || !state) {
    return NextResponse.json({ error: 'Missing installation_id or userId' }, { status: 400 });
  }
  

  let userId: string;
  try {
    const parsed = JSON.parse(decodeURIComponent(state));
    userId = parsed.userId;
  } catch (err) {
    console.error('Failed to parse state:', err);
    return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
  }

  //validate user existence
  const existingUser = await prisma.user.findUnique({
    where: { clerk_id: userId },
  });
  
  if (!existingUser) {
    console.error(`❌ User with ID ${userId} does not exist in the database.`);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Create or upsert the Installation (may not have repo info yet)
  await prisma.installation.upsert({
    where: { id: installationId },
    update: {
      updatedAt: new Date(),
    },
    create: {
      id: installationId,
      accountId: 0, // you’ll need to update this later via webhook
      accountLogin: '',
      accountType: '',
    },
  });
  const internalUserId = existingUser.id;

  // Create the mapping between user and installation
  await prisma.userInstallation.upsert({
    where: {
      userId_installationId: {
        userId: internalUserId,
        installationId,
      },
    },
    update: {
      assignedAt: new Date(),
    },
    create: {
      userId: internalUserId,
      installationId,
      assignedAt: new Date(),
    },
  });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/?installed=true`);
}