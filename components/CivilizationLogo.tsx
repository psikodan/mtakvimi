import React from 'react';

interface Props {
  className?: string;
}

const CivilizationLogo: React.FC<Props> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#312e81" /> 
    {/* Sun (Center) */}
    <circle cx="50" cy="50" r="18" fill="#fbbf24" />
    {/* Rays */}
    {Array.from({ length: 13 }).map((_, i) => {
      const angle = i * (360 / 13) - 90; 
      const isTop = i === 0;
      return (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
            {isTop ? (
                // Start Point
                <path d="M45 15 L50 2 L55 15 L50 20 Z" fill="#fcd34d" />
            ) : (
                // Standard Months
                <path d="M46 22 L50 12 L54 22 L50 26 Z" fill="#d97706" />
            )}
        </g>
      );
    })}
  </svg>
);

export default CivilizationLogo;
