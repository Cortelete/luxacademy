

import React from 'react';
import LashIcon from './icons/LashIcon';

const WinkingLashes = () => {
    // Positions for the lashes. You can add or modify these.
    const lashPositions = [
        // Original Set + More for density
        { top: '15vh', left: '5vw', transform: 'rotate(-15deg)', animationDelay: '0s' },
        { top: '80vh', left: '10vw', transform: 'rotate(20deg)', animationDelay: '1s' },
        { top: '50vh', right: '8vw', transform: 'rotate(15deg) scaleX(-1)', animationDelay: '0.5s' },
        { top: '20vh', right: '15vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '1.5s'},
        { top: '90vh', right: '25vw', transform: 'rotate(30deg)', animationDelay: '0.2s' },
        { top: '5vh', left: '25vw', transform: 'rotate(10deg)', animationDelay: '2s' },
        { top: '65vh', left: '30vw', transform: 'rotate(-25deg)', animationDelay: '1.2s' },
        { top: '40vh', right: '35vw', transform: 'rotate(5deg) scaleX(-1)', animationDelay: '2.5s' },
        { top: '95vh', left: '5vw', transform: 'rotate(45deg)', animationDelay: '0.8s' },
        { top: '5vh', right: '5vw', transform: 'rotate(10deg) scaleX(-1)', animationDelay: '3s' },
        { top: '95vh', right: '5vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '3.5s' },
        { top: '30vh', left: '45vw', transform: 'rotate(-10deg)', animationDelay: '0.4s' },
        { top: '70vh', right: '45vw', transform: 'rotate(25deg) scaleX(-1)', animationDelay: '1.8s' },
        { top: '50vh', left: '50vw', transform: 'rotate(0deg)', animationDelay: '2.2s' },
        { top: '10vh', left: '70vw', transform: 'rotate(20deg)', animationDelay: '1.1s' },
        { top: '85vh', left: '80vw', transform: 'rotate(-15deg)', animationDelay: '2.8s' },
        { top: '55vh', left: '15vw', transform: 'rotate(35deg)', animationDelay: '0.7s' },
        { top: '25vh', right: '25vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '3.2s' },
        { top: '35vh', left: '20vw', transform: 'rotate(5deg)', animationDelay: '4s' },
        { top: '75vh', right: '20vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '3.8s' },
        { top: '5vh', left: '50vw', transform: 'rotate(0deg)', animationDelay: '4.5s' },
        { top: '95vh', left: '50vw', transform: 'rotate(180deg)', animationDelay: '0.1s' },
        { top: '25vh', left: '85vw', transform: 'rotate(25deg)', animationDelay: '1.3s' },
        { top: '60vh', left: '60vw', transform: 'rotate(-30deg)', animationDelay: '2.1s' },
        { top: '45vh', left: '5vw', transform: 'rotate(10deg)', animationDelay: '3.3s' },
        { top: '85vh', right: '10vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '0.6s' },
        { top: '10vh', left: '10vw', transform: 'rotate(-20deg)', animationDelay: '4.2s' },
        { top: '90vh', left: '90vw', transform: 'rotate(15deg)', animationDelay: '1.9s' },
        { top: '30vh', right: '30vw', transform: 'rotate(20deg) scaleX(-1)', animationDelay: '2.7s' },
        { top: '70vh', left: '75vw', transform: 'rotate(-15deg)', animationDelay: '3.6s' },
        { top: '50vh', left: '95vw', transform: 'rotate(5deg)', animationDelay: '1.4s' },
        { top: '18vh', right: '55vw', transform: 'rotate(-35deg) scaleX(-1)', animationDelay: '0.3s' },
        { top: '10vh', left: '40vw', transform: 'rotate(5deg)', animationDelay: '0.1s' },
        { top: '85vh', right: '40vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '1.1s' },
        { top: '45vh', left: '40vw', transform: 'rotate(20deg)', animationDelay: '0.6s' },
        { top: '65vh', right: '5vw', transform: 'rotate(-15deg) scaleX(-1)', animationDelay: '2.1s' },
        { top: '30vh', left: '5vw', transform: 'rotate(15deg)', animationDelay: '3.1s' },
        { top: '5vh', right: '30vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '1.4s' },
        { top: '90vh', left: '65vw', transform: 'rotate(10deg)', animationDelay: '2.4s' },
        { top: '22vh', left: '18vw', transform: 'rotate(-5deg)', animationDelay: '3.4s' },
        { top: '78vh', right: '18vw', transform: 'rotate(5deg) scaleX(-1)', animationDelay: '0.9s' },
        { top: '5vh', left: '80vw', transform: 'rotate(30deg)', animationDelay: '1.7s' },
        { top: '95vh', right: '80vw', transform: 'rotate(-30deg) scaleX(-1)', animationDelay: '2.9s' },
        { top: '50vh', left: '20vw', transform: 'rotate(-10deg)', animationDelay: '3.7s' },
        { top: '33vh', right: '2vw', transform: 'rotate(10deg)', animationDelay: '0.3s' },
        { top: '66vh', left: '2vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '1.6s' },
        { top: '2vh', left: '60vw', transform: 'rotate(15deg)', animationDelay: '2.6s' },
        { top: '98vh', right: '60vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '1s' },
        { top: '50vh', right: '95vw', transform: 'rotate(25deg)', animationDelay: '3.9s' },
        { top: '28vh', left: '35vw', transform: 'rotate(-15deg)', animationDelay: '0.8s' },
        { top: '72vh', right: '35vw', transform: 'rotate(15deg) scaleX(-1)', animationDelay: '2.3s' },
        { top: '12vh', left: '90vw', transform: 'rotate(5deg)', animationDelay: '4.1s' },
        { top: '88vh', right: '90vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '0.4s' },
        { top: '2vh', left: '2vw', transform: 'rotate(-15deg)', animationDelay: '0.1s' },
        { top: '98vh', right: '2vw', transform: 'rotate(20deg) scaleX(-1)', animationDelay: '1.2s' },
        { top: '48vh', left: '2vw', transform: 'rotate(15deg)', animationDelay: '0.6s' },
        { top: '78vh', right: '95vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '1.4s' },
        { top: '38vh', left: '95vw', transform: 'rotate(30deg)', animationDelay: '0.3s' },
        { top: '3vh', left: '40vw', transform: 'rotate(10deg)', animationDelay: '2.1s' },
        { top: '92vh', right: '40vw', transform: 'rotate(-25deg) scaleX(-1)', animationDelay: '1.3s' },
        { top: '42vh', right: '25vw', transform: 'rotate(5deg)', animationDelay: '2.6s' },
        { top: '12vh', left: '5vw', transform: 'rotate(45deg)', animationDelay: '0.9s' },
        { top: '8vh', right: '8vw', transform: 'rotate(10deg) scaleX(-1)', animationDelay: '3.1s' },
        { top: '92vh', right: '8vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '3.6s' },
        { top: '32vh', left: '35vw', transform: 'rotate(-10deg)', animationDelay: '0.5s' },
        { top: '73vh', right: '65vw', transform: 'rotate(25deg) scaleX(-1)', animationDelay: '1.9s' },
        { top: '53vh', left: '60vw', transform: 'rotate(0deg)', animationDelay: '2.3s' },
        { top: '13vh', left: '80vw', transform: 'rotate(20deg)', animationDelay: '1.2s' },
        { top: '83vh', left: '90vw', transform: 'rotate(-15deg)', animationDelay: '2.9s' },
        { top: '53vh', left: '25vw', transform: 'rotate(35deg)', animationDelay: '0.8s' },
        { top: '23vh', right: '35vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '3.3s' },
        { top: '33vh', left: '10vw', transform: 'rotate(5deg)', animationDelay: '4.1s' },
        { top: '73vh', right: '10vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '3.9s' },
        { top: '3vh', left: '55vw', transform: 'rotate(0deg)', animationDelay: '4.6s' },
        { top: '93vh', left: '45vw', transform: 'rotate(180deg)', animationDelay: '0.2s' },
        { top: '23vh', left: '75vw', transform: 'rotate(25deg)', animationDelay: '1.4s' },
        { top: '63vh', left: '50vw', transform: 'rotate(-30deg)', animationDelay: '2.2s' },
        { top: '43vh', left: '8vw', transform: 'rotate(10deg)', animationDelay: '3.4s' },
        { top: '83vh', right: '15vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '0.7s' },
        { top: '13vh', left: '15vw', transform: 'rotate(-20deg)', animationDelay: '4.3s' },
        { top: '93vh', left: '85vw', transform: 'rotate(15deg)', animationDelay: '1.8s' },
        { top: '33vh', right: '40vw', transform: 'rotate(20deg) scaleX(-1)', animationDelay: '2.8s' },
        { top: '73vh', left: '85vw', transform: 'rotate(-15deg)', animationDelay: '3.7s' },
        { top: '53vh', left: '90vw', transform: 'rotate(5deg)', animationDelay: '1.5s' },
        { top: '16vh', right: '65vw', transform: 'rotate(-35deg) scaleX(-1)', animationDelay: '0.4s' },
        { top: '16vh', left: '45vw', transform: 'rotate(5deg)', animationDelay: '0.2s' },
        { top: '86vh', right: '45vw', transform: 'rotate(-10deg) scaleX(-1)', animationDelay: '1.3s' },
        { top: '46vh', left: '45vw', transform: 'rotate(20deg)', animationDelay: '0.7s' },
        { top: '66vh', right: '15vw', transform: 'rotate(-15deg) scaleX(-1)', animationDelay: '2.2s' },
        { top: '36vh', left: '15vw', transform: 'rotate(15deg)', animationDelay: '3.2s' },
        { top: '6vh', right: '35vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '1.5s' },
        { top: '96vh', left: '75vw', transform: 'rotate(10deg)', animationDelay: '2.5s' },
        { top: '26vh', left: '28vw', transform: 'rotate(-5deg)', animationDelay: '3.5s' },
        { top: '76vh', right: '28vw', transform: 'rotate(5deg) scaleX(-1)', animationDelay: '0.8s' },
        { top: '6vh', left: '85vw', transform: 'rotate(30deg)', animationDelay: '1.6s' },
        { top: '96vh', right: '85vw', transform: 'rotate(-30deg) scaleX(-1)', animationDelay: '2.8s' },
        { top: '56vh', left: '30vw', transform: 'rotate(-10deg)', animationDelay: '3.6s' },
        { top: '36vh', right: '12vw', transform: 'rotate(10deg)', animationDelay: '0.4s' },
        { top: '69vh', left: '12vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '1.7s' },
        { top: '4vh', left: '65vw', transform: 'rotate(15deg)', animationDelay: '2.7s' },
        { top: '97vh', right: '65vw', transform: 'rotate(-20deg) scaleX(-1)', animationDelay: '1.1s' },
        { top: '51vh', right: '90vw', transform: 'rotate(25deg)', animationDelay: '3.8s' },
        { top: '21vh', left: '38vw', transform: 'rotate(-15deg)', animationDelay: '0.9s' },
        { top: '71vh', right: '38vw', transform: 'rotate(15deg) scaleX(-1)', animationDelay: '2.4s' },
        { top: '11vh', left: '95vw', transform: 'rotate(5deg)', animationDelay: '4.2s' },
        { top: '81vh', right: '95vw', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '0.5s' },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {lashPositions.map((style, index) => (
                <div
                    key={index}
                    className="absolute subtle-wink-animation"
                    style={{...style, animationDuration: `${Math.random() * 3 + 4}s`}}
                >
                    <LashIcon className="w-10 h-10 md:w-12 md:h-12 text-[#EACD8C] opacity-[0.3]" />
                </div>
            ))}
        </div>
    );
};

export default WinkingLashes;