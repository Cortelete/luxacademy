import React from 'react';

const CertificateIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="15" cy="15" r="3"></circle>
        <path d="M12 12L21 3"></path>
        <path d="M21 12v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h6"></path>
        <path d="M21 3l-6 6"></path>
    </svg>
);

export default CertificateIcon;