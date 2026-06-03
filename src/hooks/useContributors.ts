import { useQuery } from '@tanstack/react-query';
import { fetchContributors, type Contributor } from '../api/github';

export function useContributors(owner: string, repoName: string, limit: number = 30) {
  return useQuery<Contributor[]>({
    queryKey: ['contributors', owner, repoName],
    queryFn: () => fetchContributors(owner, repoName, limit),
    enabled: !!owner && !!repoName,
  });
}