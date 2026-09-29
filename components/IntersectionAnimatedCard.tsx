import React from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';

interface IntersectionAnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  distance?: number;
}

export const IntersectionAnimatedCard: React.FC<IntersectionAnimatedCardProps> = ({
  children,
  delayMs = 0,
  className = '',
  distance = 32,
  style = {},
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : `translateY(${distance}px)`,
        transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delayMs}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default IntersectionAnimatedCard;
