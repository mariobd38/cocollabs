export type Repository = {
  githubRepoId: string;
  name: string;
  fullName: string;
  owner: string;
  languages: RepoLanguage[];
  private: boolean;
}

export type RepoLanguage = {
  name: string;
  bytes: number;
}