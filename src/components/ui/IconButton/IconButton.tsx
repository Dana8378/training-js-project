import styles from './IconButton.module.css';
import searchIcon from './assets/search-icon.svg';

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButton = ({ 
  onClick, 
  disabled = false 
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Поиск"
    >
      <img src={searchIcon} alt="" className={styles.icon} />
    </button>
  );
};