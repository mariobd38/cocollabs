import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { InstallationWithRepositories } from '@/types/installation';

const prisma = new PrismaClient();

export async function GET(req: NextRequest,{ params }: { params: { clerkId: string } }) {
  try {
    params = await params
    const { clerkId } = params;
    const user = await prisma.user.findUnique({
      where: { clerk_id: clerkId },
      include: {
        installations: {
          include: {
            installation: {
              include: {
                repositories: true,
              },
            },
          },
        },
      },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const repositories = user.installations.flatMap((i: InstallationWithRepositories) =>
      i.installation.repositories.map(repo => ({
        id: repo.id,
        githubRepoId: repo.githubRepoId,
        name: repo.name,
        fullName: repo.fullName,
      }))
    );
  
    return NextResponse.json({ repositories }, { status: 200 });
    // return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}