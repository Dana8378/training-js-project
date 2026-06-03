import { useQuery } from '@tanstack/react-query';
import { fetchRepoDetails, type RepoDetails } from '../api/github';

export function useRepoDetails(owner: string, repoName: string) {
  return useQuery<RepoDetails>({
    queryKey: ['repo', owner, repoName],
    queryFn: () => fetchRepoDetails(owner, repoName),
    enabled: !!owner && !!repoName,
  });
}