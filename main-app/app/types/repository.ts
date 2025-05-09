export type Repository = {
  githubRepoId: string;
  name: string;
  fullName: string;
  owner: string;
  languages: RepoLanguage[];
}

export type RepoLanguage = {
  name: string;
  bytes: number;
}