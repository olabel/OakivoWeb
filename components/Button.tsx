import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'black' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantStyles = {
    primary: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold shadow-lg shadow-cyan-500/20',
    secondary: 'bg-white hover:bg-slate-200 text-slate-950 font-semibold shadow-md',
    black: 'bg-black hover:bg-slate-900 text-white border border-white/20 shadow-xl',
    outline: 'bg-transparent hover:bg-white/[0.06] text-slate-200 border border-white/20 hover:border-white/40',
    ghost: 'bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs tracking-wider uppercase',
    lg: 'px-7 py-3.5 text-sm tracking-wider uppercase'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
