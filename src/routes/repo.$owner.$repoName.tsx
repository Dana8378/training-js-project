import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import styles from './repo.module.css';
import { useRepoDetails } from '../hooks/useRepoDetails';
import { useBranches } from '../hooks/useBranches';

import starIcon from '../assets/icons/star.svg';
import eyeIcon from '../assets/icons/eye.svg';
import forkIcon from '../assets/icons/fork.svg';
import issueIcon from '../assets/icons/issue.svg';
import backIcon from '../assets/icons/arrow-back.svg';


function RepoPage() {
  const { owner, repoName } = useParams({ from: '/repo/$owner/$repoName' });
  const navigate = useNavigate();
  
  const { data: repo, isLoading, error } = useRepoDetails(owner, repoName);

  const { data: branches, isLoading: branchesLoading } = useBranches(owner, repoName);

    if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  if (!repo) {
    return <div className={styles.error}>Репозиторий не найден</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={() => navigate({ to: '/' })}>
          <img src={backIcon} alt="Back" />
        </button>
        <div className={styles.repoTitle}>
          <img src={repo.owner.avatar_url} alt="" className={styles.avatar} />
          <span>{repo.name}</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div><img src={starIcon} alt="" /> {repo.stargazers_count.toLocaleString()}</div>
        <div><img src={eyeIcon} alt="" /> {repo.watchers_count.toLocaleString()}</div>
        <div><img src={forkIcon} alt="" /> {repo.forks_count.toLocaleString()}</div>
        <div><img src={issueIcon} alt="" /> {repo.open_issues_count.toLocaleString()}</div>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>
        <p>{repo.description}</p>
      </div>

      <div className={styles.calendar}>
        <h3>Contributions</h3>
        <div className={styles.calendarPlaceholder}>
          <div className={styles.months}>
            <span className={styles.monthLabel}>Oct</span>
            <span className={styles.monthLabel}>Nov</span>
            <span className={styles.monthLabel}>Dec</span>
            <span className={styles.monthLabel}>Jan</span>
            <span className={styles.monthLabel}>Feb</span>
            <span className={styles.monthLabel}>Mar</span>
            <span className={styles.monthLabel}>Apr</span>
          </div>
          <div className={styles.cells}>
            {[...Array(210)].map((_, i) => (
              <div key={i} className={styles.cell} data-level={i % 4} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.contributors}>
        <h3>Contributors</h3>
        <div className={styles.avatarList}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={styles.avatarPlaceholder}>
              {String.fromCharCode(65 + i % 26)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.branches}>
        <h3 className={styles.blockTitle}>Branches List</h3>
        {branchesLoading ? (
          <div className={styles.loadingSmall}>Загрузка веток...</div>
        ) : branches && branches.length > 0 ? (
          <ul className={styles.branchList}>
            {branches.map((branch) => (
              <li key={branch.name} className={styles.branchItem}>
                <span className={styles.branchName}>{branch.name}</span>
                {branch.protected && (
                  <span className={styles.protected}>PROTECTED</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noData}>Нет веток</div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/repo/$owner/$repoName')({
  component: RepoPage,
});