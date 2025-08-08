//import React from 'react';

//const LashIcon = (props: React.SVGProps<SVGSVGElement>) => (
//  <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
//    <path
//      d="M99 25C99 25 85 0 50 0S1 25 1 25M20 25C20 25 25 45 40 50M50 22C50 22 50 48 50 50M80 25C80 25 75 45 60 50"
//      stroke="currentColor"
//      strokeWidth="2"
//      strokeLinecap="round"
//      strokeLinejoin="round"
//    />
//  </svg>
//);
//
//export default LashIcon;

import React from 'react';

const LashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Upper Eyelid Line - slightly thicker to be more defined */}
    <path 
      d="M5 30 C 30 5, 70 5, 95 30" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    
    {/* Lash Extensions - redesigned to sit correctly on the eyelid and fan out realistically */}
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M11 23 Q 13 13, 15 3" />
      <path d="M17 19 Q 20 9, 23 -1" />
      <path d="M25 15 Q 28 5, 31 -5" />
      <path d="M33 13 Q 36 3, 39 -7" />
      <path d="M40 11 Q 43 1, 46 -9" />
      <path d="M50 10 Q 50 0, 50 -10" />
      <path d="M60 11 Q 57 1, 54 -9" />
      <path d="M67 13 Q 64 3, 61 -7" />
      <path d="M75 15 Q 72 5, 69 -5" />
      <path d="M83 19 Q 80 9, 77 -1" />
      <path d="M89 23 Q 87 13, 85 3" />
    </g>

     {/* Lower Lid Line (kept same, as it defines the eye shape) */}
    <path 
      d="M10 31 C 35 42, 65 42, 90 31"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export default LashIcon;