import React from 'react';
import { Course } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface CourseSlideProps {
    course: Course;
    featureCategories: Record<string, string[]>;
}

const CourseSlide = ({ course, featureCategories }: CourseSlideProps) => {
    const isHighlighted = !!course.highlight;
    const WHATSAPP_NUMBER = '5542999722042';

    const whatsappContactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(course.whatsappMessage)}`;

    return (
        <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center bg-[#121212] p-6 relative">
             {isHighlighted && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#FDB813] text-[#121212] px-4 py-1 rounded-full text-sm font-bold shadow-md z-20">
                    {course.highlight}
                </div>
            )}
            <div className={`container mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 transition-all duration-500 ${isHighlighted ? 'scale-105' : 'scale-100'}`}>

                {/* Left Side: Title & Price */}
                <div className="md:w-1/3 text-center md:text-left flex flex-col justify-center">
                    <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-white mb-2">{course.title}</h2>
                    <p className="text-gray-400 text-lg mb-6">{course.uniqueDescription}</p>
                    <p className="text-5xl lg:text-7xl font-bold text-white mb-8">{course.price}</p>
                     <div className="space-y-4 flex flex-col mt-auto w-full max-w-sm mx-auto md:mx-0">
                        <button className="w-full bg-[#FDB813] text-[#121212] font-bold py-4 rounded-full hover:bg-[#ffc94a] transition-colors text-lg">
                            {course.cta}
                        </button>
                         <a 
                            href={whatsappContactUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full border-2 border-[#FDB813] text-[#FDB813] font-bold py-3.5 rounded-full hover:bg-[#FDB813] hover:text-[#121212] transition-colors text-center text-lg"
                        >
                            Falar com um especialista
                        </a>
                    </div>
                </div>

                {/* Right Side: Features */}
                <div className="md:w-2/3 lg:w-1/2 h-full md:h-auto max-h-[70vh] md:max-h-[60vh] overflow-y-auto pr-4">
                     <div className="text-left space-y-4">
                        {Object.entries(featureCategories).map(([category, features]) => {
                            const isCategoryIncluded = course.includedCategories.includes(category as any);
                            return (
                                <div key={category}>
                                    <h5 className={`font-bold text-lg mb-3 ${isCategoryIncluded ? 'text-[#FDB813]' : 'text-gray-500'}`}>{category}</h5>
                                    <ul className="space-y-2">
                                        {features.map((feature) => (
                                            <li key={feature} className={`flex items-start ${isCategoryIncluded ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
                                                {isCategoryIncluded 
                                                    ? <CheckIcon className="w-5 h-5 mr-3 mt-0.5 text-green-400 flex-shrink-0" /> 
                                                    : <XIcon className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                                                }
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSlide;