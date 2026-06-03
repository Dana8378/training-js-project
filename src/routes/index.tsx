import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './index.module.css';

import { Input } from '../components/ui/Input';
import { IconButton } from '../components/ui/IconButton';
import { MultiDropdown, type Option } from '../components/ui/MultiDropdown';
import { Card } from '../components/dummies/Card';
import { useRepos } from '../hooks/useRepos';


const languageOptions: Option[] = [
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
];

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [orgName, setOrgName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);

  const { data: repos, isLoading, error, refetch } = useRepos(orgName);

  const handleSearch = () => {
    refetch();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.searchBlock}>
        <Input
          value={orgName}
          onChange={setOrgName}
          placeholder="Enter organization name"
        />
        <IconButton onClick={handleSearch} />
      </div>

      <div className={styles.headerBlock}>
        <h2 className={styles.title}>Repositories</h2>
        <div style={{ width: '180px' }}>
          <MultiDropdown
            options={languageOptions}
            selected={selectedLanguages}
            onChange={setSelectedLanguages}
            placeholder="Languages"
          />
        </div>
      </div>

      <div className={styles.cardsBlock}>
        {isLoading && <div className={styles.loading}>Загрузка...</div>}
        
        {error && <div className={styles.error}>Ошибка: {error.message}</div>}

        {repos && repos.map((repo) => (
          <Card
            key={repo.id}
            repoName={repo.name}
            userName={repo.owner.login}
            stars={repo.stargazers_count}
            updatedAt={formatDate(repo.updated_at)}
            avatarUrl={repo.owner.avatar_url}
          />
        ))}
      </div>
    </div>
  );
}