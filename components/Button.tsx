import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black' | 'visa' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "font-sans font-bold transition-all duration-500 ease-in-out focus:outline-none flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 whitespace-nowrap";
  
  const variants = {
    primary: "bg-oakivo-primary text-white hover:bg-black rounded-full shadow-lg border border-transparent",
    visa: "bg-oakivo-primary text-white hover:bg-black rounded-full shadow-premium border border-transparent", 
    black: "bg-[#020504] text-white hover:bg-gray-800 rounded-full shadow-xl border border-white/10",
    secondary: "bg-white text-oakivo-primary border border-gray-200 hover:border-oakivo-secondary hover:bg-gray-50 rounded-full shadow-sm",
    outline: "bg-transparent border-2 border-oakivo-primary text-oakivo-primary hover:bg-oakivo-primary hover:text-white rounded-full",
    ghost: "bg-transparent text-oakivo-primary hover:text-oakivo-secondary p-0 shadow-none rounded-none border-b-2 border-transparent hover:border-oakivo-secondary",
    white: "bg-white text-oakivo-primary hover:bg-oakivo-secondary hover:text-black rounded-full shadow-xl border border-transparent",
    dark: "bg-oakivo-primary/10 text-oakivo-primary hover:bg-oakivo-primary hover:text-white border border-oakivo-primary/20 rounded-full",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-xs uppercase tracking-widest",
    md: "px-8 py-3.5 text-sm uppercase tracking-widest",
    lg: "px-12 py-5 text-base lg:text-xl",
  };

  const activeSize = variant === 'ghost' ? 'pb-1' : sizes[size];

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${activeSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;