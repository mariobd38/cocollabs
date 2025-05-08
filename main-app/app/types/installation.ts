export type InstallationWithRepositories = {
  installation: {
    repositories: {
      id: string;
      githubRepoId: number;
      name: string;
      fullName: string;
    }[];
  };
};