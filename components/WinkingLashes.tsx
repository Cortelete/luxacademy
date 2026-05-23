import React from 'react';
import LashIcon from './icons/LashIcon';

const WinkingLashes = () => {
    // Reduced number of lashes for minimalism
    const lashPositions = [
        { top: '15%', left: '5%', transform: 'rotate(-15deg)', animationDelay: '0s' },
        { top: '80%', left: '10%', transform: 'rotate(20deg)', animationDelay: '1s' },
        { top: '50%', right: '8%', transform: 'rotate(15deg) scaleX(-1)', animationDelay: '0.5s' },
        { top: '20%', right: '15%', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '1.5s'},
        { top: '65%', left: '30%', transform: 'rotate(-25deg)', animationDelay: '1.2s' },
        { top: '40%', right: '35%', transform: 'rotate(5deg) scaleX(-1)', animationDelay: '2.5s' },
        { top: '90%', right: '25%', transform: 'rotate(30deg)', animationDelay: '0.2s' },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {lashPositions.map((style, index) => (
                <div
                    key={index}
                    className="absolute subtle-wink-animation opacity-[0.03] text-[var(--color-text-strong)]"
                    style={{...style, animationDuration: `${Math.random() * 4 + 5}s`}}
                >
                    <LashIcon className="w-16 h-16 md:w-24 md:h-24" />
                </div>
            ))}
        </div>
    );
};

export default WinkingLashes;