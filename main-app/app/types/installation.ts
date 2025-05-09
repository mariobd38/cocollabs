import { RepoLanguage } from "@/types/repository";

export type InstallationWithRepositories = {
  installation: {
    repositories: {
      id: string;
      githubRepoId: number;
      name: string;
      fullName: string;
      owner: string;
      private: boolean;
      languages: RepoLanguage[];
    }[];
  };
};