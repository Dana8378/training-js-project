import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import styles from './index.module.css';

import { Input } from '../components/ui/Input';
import { IconButton } from '../components/ui/IconButton';
import { MultiDropdown, type Option } from '../components/ui/MultiDropdown';
import { Card } from '../components/dummies/Card';
import { useRepos } from '../hooks/useRepos';


export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [orgName, setOrgName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);

  const { data: repos, isLoading, error, refetch } = useRepos(orgName);

  const filteredRepos = repos?.filter(repo => {
    if (selectedLanguages.length === 0) return true;
    if (!repo.language) return false;
    return selectedLanguages.some(lang => lang.label === repo.language);
  });

  const languageOptions = useMemo(() => {
    if (!repos) return [];
    const languages = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) languages.add(repo.language);
    });
    return Array.from(languages).map(lang => ({ id: lang, label: lang }));
  }, [repos]);

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

        {filteredRepos && filteredRepos.map((repo) => (
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