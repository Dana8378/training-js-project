import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

export const Loader = ({ size = 'medium' }: LoaderProps) => {
  return (
    <div className={`${styles.loader} ${styles[size]}`}></div>
  );
};