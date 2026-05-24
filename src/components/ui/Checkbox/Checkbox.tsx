import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({ 
  checked = false, 
  disabled = false, 
  onChange,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
        onChange(e.target.checked);
    }
  };

  return (
    <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className={styles.checkbox}>
        {/* Галочка (SVG) */}
        <svg
          className={styles.checkmark}
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5L5 9L14 1"
            stroke="rgba(255, 85, 85, 1)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
};

