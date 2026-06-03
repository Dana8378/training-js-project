import { useQuery } from '@tanstack/react-query';
import { fetchOrgRepos, type Repository } from '../api/github';

export function useRepos(orgName: string) {
  return useQuery<Repository[]>({
    queryKey: ['repos', orgName],
    queryFn: () => fetchOrgRepos(orgName),
    enabled: !!orgName,
  });
}