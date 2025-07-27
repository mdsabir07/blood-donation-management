import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.setAttribute('data-theme', 'dark');      // ✅ required by DaisyUI
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');     // ✅ required by DaisyUI
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(prev => !prev)}
            className='px-2 py-1 cursor-pointer border rounded text-sm dark:bg-gray-800 dark:text-white bg-gray-200 text-black'
        >
            {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
};

export default ThemeToggle;
