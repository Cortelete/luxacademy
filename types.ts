

import React from 'react';

export interface Course {
    id: number;
    title: string;
    uniqueDescription: string;
    motivationalPhrase: string;
    price: string;
    cta: string;
    highlight?: string;
    whatsappMessage: string;
    includedCategories: string[];
    includedFeatures?: string[];
    modalPhrases: string[];
    difficulty: string;
    focus: string;
}

export interface SectionRefs {
    home: React.RefObject<HTMLElement>;
    about: React.RefObject<HTMLElement>;
    courses: React.RefObject<HTMLElement>;
    contact: React.RefObject<HTMLElement>;
}

export interface InfoModalData {
    title: string;
    hook: string;
    type?: 'mentorBio' | 'customCourse' | 'default';
}