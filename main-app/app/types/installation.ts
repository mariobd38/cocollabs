export type InstallationWithRepositories = {
  installation: {
    repositories: {
      id: string;
      githubRepoId: string;
      name: string;
      fullName: string;
    }[];
  };
};