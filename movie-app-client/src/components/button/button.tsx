import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'default' | 'add' | 'remove';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  className, 
  children, 
  variant = 'default', 
  fullWidth = false,
  ...props 
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`;

  return (
    <button onClick={onClick} className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;