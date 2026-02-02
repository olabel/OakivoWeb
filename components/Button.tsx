import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black' | 'visa';
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
  const baseStyles = "font-sans font-semibold transition-all duration-200 ease-in-out focus:outline-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-oakivo-primary text-white hover:bg-black rounded-full shadow-vise",
    visa: "bg-oakivo-primary text-white hover:bg-[#000] rounded-full px-8 py-3 font-bold shadow-vise", 
    black: "bg-oakivo-primary text-white hover:bg-gray-900 rounded-full shadow-vise",
    secondary: "bg-white text-oakivo-primary border border-oakivo-border hover:border-oakivo-primary rounded-full shadow-vise",
    outline: "bg-transparent border border-oakivo-primary text-oakivo-primary hover:bg-oakivo-primary hover:text-white rounded-full",
    ghost: "bg-transparent text-oakivo-primary hover:text-oakivo-secondary p-0 shadow-none rounded-none border-b-2 border-transparent hover:border-oakivo-secondary",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-10 py-4 text-base",
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