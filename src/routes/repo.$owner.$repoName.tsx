import { createFileRoute, useParams, useNavigate } from '@tanstack/react-router';
import styles from './repo.module.css';

import starIcon from '../assets/icons/star.svg';
import eyeIcon from '../assets/icons/eye.svg';
import forkIcon from '../assets/icons/fork.svg';
import issueIcon from '../assets/icons/issue.svg';
import backIcon from '../assets/icons/arrow-back.svg';

const mockData = {
  name: 'git-repo-name',
  description: 'My first repository on GitHub!',
  stars: 123,
  watchers: 24,
  forks: 8,
  issues: 0,
  owner: { login: 'username', avatar_url: 'https://avatars.githubusercontent.com/u/69631' }
};

function RepoPage() {
  const { owner, repoName } = useParams({ from: '/repo/$owner/$repoName' });
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={() => navigate({ to: '/' })}>
          <img src={backIcon} alt="Back" />
        </button>
        <div className={styles.repoTitle}>
          <img src={mockData.owner.avatar_url} alt="" className={styles.avatar} />
          <span>{mockData.name}</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div><img src={starIcon} alt="" /> {mockData.stars}</div>
        <div><img src={eyeIcon} alt="" /> {mockData.watchers}</div>
        <div><img src={forkIcon} alt="" /> {mockData.forks}</div>
        <div><img src={issueIcon} alt="" /> {mockData.issues}</div>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>
        <p>{mockData.description}</p>
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
        <h3>Branches List</h3>
        <ul>
          <li>branch-1 <span className={styles.protected}>PROTECTED</span></li>
          <li>branch-2</li>
          <li>branch-3</li>
          <li>branch-4 <span className={styles.protected}>PROTECTED</span></li>
          <li>branch-5</li>
        </ul>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/repo/$owner/$repoName')({
  component: RepoPage,
});