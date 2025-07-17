import React from 'react';

const CryptoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9 12H8.1C7 12 7 11.22 7 10.5c0-.98.9-1.5 2-1.5s2 .52 2 1.5c0 .6-.4 1-1 1.2"></path>
        <path d="M12 15V9"></path>
        <path d="M15 12h.9c1.1 0 1.1.78 1.1 1.5 0 .98-.9 1.5-2 1.5s-2-.52-2-1.5c0-.6.4-1 1-1.2"></path>
    </svg>
);

export default CryptoIcon;