import styles from './Card.module.css';
import starIcon from './assets/star-icon.svg';

export interface CardProps {
  repoName: string;
  userName: string;
  stars: number;
  updatedAt: string;
  avatarUrl?: string;
}

export const Card = ({ 
  repoName, 
  userName, 
  stars, 
  updatedAt, 
  avatarUrl,
}: CardProps) => {
  const firstLetter = repoName.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      {}
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={`${userName}'s avatar`} 
            className={styles.avatar}
          />
        ) : (
          <div className={styles.defaultAvatar}>
            <span className={styles.defaultAvatarLetter}>{firstLetter}</span>
          </div>
        )}
      </div>

      {}
      <div className={styles.info}>
        <h3 className={styles.repoName}>{repoName}</h3>
        <p className={styles.userName}>{userName}</p>
        
        <div className={styles.meta}>
          <div className={styles.stars}>
            <img src={starIcon} alt="Stars" className={styles.starIcon} />
            <span>{stars.toLocaleString()}</span>
          </div>
          <div className={styles.updatedAt}>
            Updated {updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
};