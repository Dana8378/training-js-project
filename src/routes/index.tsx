import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import styles from './index.module.css';

import { Input } from '../components/ui/Input';
import { IconButton } from '../components/ui/IconButton';
import { MultiDropdown, type Option } from '../components/ui/MultiDropdown';
import { Card } from '../components/dummies/Card';

const mockRepos = [
  {
    repoName: 'repo-name',
    userName: 'test-user',
    stars: 123,
    updatedAt: '21 Jul',
  },
  {
    repoName: 'name-repo',
    userName: 'test-user',
    stars: 124,
    updatedAt: '21 Jul',
  },
  {
    repoName: 'test-repo',
    userName: 'test-user',
    stars: 125,
    updatedAt: '21 Jul',
  },
  {
    repoName: 'very-long-repository-name-that-exceeds-limit',
    userName: 'test-user',
    stars: 126,
    updatedAt: '21 Jul',
  },
];

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
  const [searchValue, setSearchValue] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);

  const handleSearch = () => {
    console.log('Поиск:', searchValue);
    console.log('Выбранные языки:', selectedLanguages);
  };

  return (
    <div className={styles.page}>
      <div className={styles.searchBlock}>
        <Input
          value={searchValue}
          onChange={setSearchValue}
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
        {mockRepos.map((repo, index) => (
          <Card
            key={`${repo.userName}-${repo.repoName}-${index}`}
            repoName={repo.repoName}
            userName={repo.userName}
            stars={repo.stars}
            updatedAt={repo.updatedAt}
            avatarUrl={repo.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}