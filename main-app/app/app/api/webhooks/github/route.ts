import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';


const GITHUB_WEBHOOK_SECRET = process.env.NEXT_GITHUB_WEBHOOK_SECRET!;

function verifySignature(req: NextRequest, body: string): boolean {
  const signature = req.headers.get('x-hub-signature-256') || '';
  const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(body).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifySignature(req, rawBody)) {
    console.warn('Invalid GitHub signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = req.headers.get('x-github-event');
  const payload = JSON.parse(rawBody);

  console.log(`🔔 GitHub Event Received: ${event}`);

  switch (event) {
    case 'installation':
      console.log(`New installation ID: ${payload.installation?.id}`);
      break;
    case 'installation_repositories':
      const action = payload.action; // 'added' or 'removed'
      const addedRepos = payload.repositories_added || [];
      const removedRepos = payload.repositories_removed || [];
      
      if (action === 'added') {
        for (const repo of addedRepos) {
          console.log(`✅ Repo added: ${repo.full_name} (ID: ${repo.id})`);
          // Save to DB or take action
        }
      }
    
      if (action === 'removed') {
        for (const repo of removedRepos) {
          console.log(`🗑️ Repo removed: ${repo.full_name} (ID: ${repo.id})`);
          // Remove from DB or update app logic
        }
      }
      
      break;

    case 'pull_request':
      console.log(`PR #${payload.pull_request?.number} ${payload.action}`);
      break;

    case 'pull_request_review':
      console.log(`Review on PR #${payload.pull_request?.number}`);
      break;

    default:
      console.log('Unhandled event type:', event);
  }

  return NextResponse.json({ message: 'OK' });
}
