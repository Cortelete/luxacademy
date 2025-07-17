import React, { useState, useEffect } from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme;
            // Defaults to system preference if no theme is saved
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark'; // Default theme for server-side rendering
    });

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeSwitcher;
