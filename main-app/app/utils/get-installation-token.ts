import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

type RepoIdentifier = { owner: string; repo: string };


async function getInstallationToken(installationId: number): Promise<string> {
  const auth = createAppAuth({
    appId: process.env.NEXT_GITHUB_APP_ID!,
    privateKey: process.env.NEXT_GITHUB_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  });
  
  const installationAuthentication = await auth({ type: 'installation', installationId });
  return installationAuthentication.token;
}
  
async function createOctokitForInstallation(installationId: number): Promise<Octokit> {
  const token = await getInstallationToken(installationId);
  return new Octokit({ auth: token });
}

  
export async function getRepositoryDetails({ owner, repo }: RepoIdentifier, installationId: number) {
  const octokit = await createOctokitForInstallation(installationId);

  const { data } = await octokit.repos.listLanguages({
    owner,
    repo,
  });

  return data;
}
