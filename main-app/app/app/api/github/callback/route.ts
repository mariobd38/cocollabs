import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const installationId = url.searchParams.get('installation_id');
  const repository_selection = url.searchParams.get('repository_selection');
  console.log('wowoo')
  console.log(repository_selection)
  // Save this in your DB or session if needed
  console.log('GitHub App installed! Installation ID:', installationId);

  // Redirect user to /home or wherever you want
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/?installed=true`);
}