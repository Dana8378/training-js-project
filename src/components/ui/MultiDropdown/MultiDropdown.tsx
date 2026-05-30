import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiDropdown.module.css';
import arrowIcon from './assets/arrow-down.svg';

export interface Option {
  id: string;
  label: string;
}

interface MultiDropdownProps {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const MultiDropdown = ({ 
  options, 
  selected, 
  onChange, 
  placeholder = 'Выберите организации',
  disabled = false
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDisplayText = () => {
    if (selected.length === 0) {
      return placeholder;
    }
    return selected.map(opt => opt.label).join(', ');
  };

  const displayText = getDisplayText();

  const isSelected = (option: Option) => {
    return selected.some(item => item.id === option.id);
  };

  const handleSelect = (option: Option) => {
    if (disabled) return;
    
    if (isSelected(option)) {
      onChange(selected.filter(item => item.id !== option.id));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={`${styles.dropdown} ${disabled ? styles.disabled : ''} ${isOpen ? styles.focused : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`${styles.text} ${selected.length > 0 ? styles.selectedText : ''}`}>
          {displayText}
        </span>
        <img 
          src={arrowIcon} 
          alt=""
          className={styles.arrow}
        />
      </div>

      {isOpen && !disabled && (
        <div className={styles.optionsList}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${isSelected(option) ? styles.selectedOption : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};