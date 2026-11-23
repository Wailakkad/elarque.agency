import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};
