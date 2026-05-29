import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Loader = ({ size = 'medium', color = 'rgba(255, 85, 85, 1)' }: LoaderProps) => {
  const gradientStyle = {
    background: `conic-gradient(
      from 0deg,
      ${color} 0deg,
      ${color} 270deg,
      transparent 270deg,
      transparent 360deg
    )`
  };

  return (
    <div 
      className={`${styles.loader} ${styles[size]}`} 
      style={gradientStyle}
    ></div>
  );
};