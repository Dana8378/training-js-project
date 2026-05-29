import React from 'react';
import styles from './Button.module.css';
import { Loader } from '../Loader';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  type = 'button'
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={isDisabled}
      data-loading={loading}
    >
      {loading && (
        <div className={styles.loaderWrapper}>
          <Loader size="small" color="white" />
        </div>
      )}
      <span className={loading ? styles.textWithLoader : styles.text}>
        {children}
      </span>
    </button>
  );
};