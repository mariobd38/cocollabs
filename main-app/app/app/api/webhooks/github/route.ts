import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { useUser } from '@clerk/nextjs';
import React from 'react';


const GITHUB_WEBHOOK_SECRET = process.env.NEXT_GITHUB_WEBHOOK_SECRET!;

function verifySignature(req: NextRequest, body: string): boolean {
  const signature = req.headers.get('x-hub-signature-256') || '';
  const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(body).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const prisma = new PrismaClient();


  if (!verifySignature(req, rawBody)) {
    console.warn('Invalid GitHub signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = req.headers.get('x-github-event');
  const payload = JSON.parse(rawBody);

  console.log(`🔔 GitHub Event Received: ${event}`);

  const installation = payload.installation;
  const account = installation.account;
  const installationId = installation.id;
  const action = payload.action; //added, removed, deleted

  switch (event) {

    case 'installation':
      console.log(`🔔 PAYLOAD EVENT: ${action}`);
      console.log(`New installation ID: ${payload.installation?.id}`);
      console.log(`New repository:`,payload.repositories);
      console.log(`New installation:`,payload.installation);
      if (action === 'created') {
        await prisma.installation.upsert({
          where: { id: installationId },
          update: {
            accountId: account.id,
            accountLogin: account.login,
            accountType: account.type,
          },
          create: {
            id: installationId,
            accountId: account.id,
            accountLogin: account.login,
            accountType: account.type,
          },
        });
  
        for (const repo of payload.repositories) {
          await prisma.repository.upsert({
            where: { githubRepoId: repo.id },
            update: {
              name: repo.name,
              fullName: repo.full_name,
              updatedAt: new Date(),
            },
            create: {
              githubRepoId: repo.id,
              name: repo.name,
              fullName: repo.full_name,
              installationId: installationId,
            },
          });
        }
      }

      if (action === 'deleted') {
        //add deleted logic
        await prisma.installation.deleteMany({
          where: { id: installationId },
        });
      }

      break;
    case 'installation_repositories':
      const addedRepos = payload.repositories_added || [];
      const removedRepos = payload.repositories_removed || [];
      console.log(`New installation ID: ${payload.installation?.id}`);
      console.log(payload.installation)
      console.log(payload.repositories_added)
      
      if (action === 'added') {
        for (const repo of addedRepos) {
          console.log(`✅ Repo added: ${repo.full_name} (ID: ${repo.id})`);
          for (const repo of addedRepos) {
            await prisma.repository.upsert({
              where: { githubRepoId: repo.id },
              update: {
                name: repo.name,
                fullName: repo.full_name,
                updatedAt: new Date(),
              },
              create: {
                githubRepoId: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                installationId: installationId,
              },
            });
          }
          // Save to DB or take action
        }
      }
    
      if (action === 'removed') {
        for (const repo of removedRepos) {
          console.log(`🗑️ Repo removed: ${repo.full_name} (ID: ${repo.id})`);
          await prisma.repository.delete({
            where: { githubRepoId: repo.id },
          });
        }
      }
      
      break;

    case 'pull_request':
      console.log(`PR #${payload.pull_request?.number} ${action}`);
      break;

    case 'pull_request_review':
      console.log(`Review on PR #${payload.pull_request?.number}`);
      break;

    default:
      console.log('Unhandled event type:', event);
  }

  return NextResponse.json({ message: 'OK' });
}

