import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black';
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
  const baseStyles = "font-sans font-semibold tracking-wide transition-all duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-oakivo-secondary text-oakivo-primary hover:bg-green-400 border border-transparent", // Green button
    black: "bg-oakivo-primary text-white hover:bg-gray-900 border border-transparent", // Black button
    secondary: "bg-white text-oakivo-primary border border-oakivo-primary hover:bg-gray-50",
    outline: "bg-transparent border border-white text-white hover:bg-white hover:text-oakivo-primary",
    ghost: "bg-transparent text-oakivo-primary hover:text-oakivo-secondary p-0 shadow-none rounded-none border-b-2 border-transparent hover:border-oakivo-secondary",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  // Ghost buttons often don't need standard padding
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