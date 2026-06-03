import { useQuery } from '@tanstack/react-query';
import { fetchBranches, type Branch } from '../api/github';

export function useBranches(owner: string, repoName: string) {
  return useQuery<Branch[]>({
    queryKey: ['branches', owner, repoName],
    queryFn: () => fetchBranches(owner, repoName),
    enabled: !!owner && !!repoName,
  });
}