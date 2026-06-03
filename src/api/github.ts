const GITHUB_API = 'https://api.github.com';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  updated_at: string;
}

export interface RepoDetails extends Repository {
  language: string | null;
  license: {
    name: string;
  } | null;
  subscribers_count: number;
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export async function fetchOrgRepos(orgName: string): Promise<Repository[]> {
  if (!orgName) return [];
  
  const response = await fetch(`${GITHUB_API}/orgs/${orgName}/repos?per_page=30`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchRepoDetails(owner: string, repoName: string): Promise<RepoDetails> {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repoName}`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchCommitActivity(owner: string, repoName: string) {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repoName}/stats/participation`);
  
  if (!response.ok) {
    return null;
  }
  
  return response.json();
}

export async function fetchContributors(owner: string, repoName: string, limit: number = 20) {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repoName}/contributors?per_page=${limit}`);
  
  if (!response.ok) {
    return [];
  }
  
  return response.json();
}

export async function fetchBranches(owner: string, repoName: string): Promise<Branch[]> {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repoName}/branches`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки веток: ${response.status}`);
  }
  
  return response.json();
}

