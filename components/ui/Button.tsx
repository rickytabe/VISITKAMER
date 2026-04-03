import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none';
  
  const variants = {
    primary: 'bg-primary text-neutral-white hover:bg-opacity-90 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-neutral-white hover:bg-opacity-90 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-neutral-medium hover:text-neutral-black hover:bg-neutral-light/50',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg rounded-xl',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
