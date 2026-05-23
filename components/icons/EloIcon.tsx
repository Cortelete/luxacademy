
import React from 'react';

const EloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="14" cy="14" r="14" fill="#F7A600" />
    <circle cx="31" cy="14" r="14" fill="#00579E" />
    <path d="M22.5 14a14 14 0 01-8.5 12.8A14 14 0 0022.5 28a14 14 0 008.5-1.2A14 14 0 0122.5 14z" fill="#333333" />
  </svg>
);

export default EloIcon;