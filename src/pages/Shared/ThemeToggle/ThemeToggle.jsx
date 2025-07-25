import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check if the theme is already saved in localStorage, else use system preference
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    })

    useEffect(() => {
        // Get the root HTML element
        const root = window.document.documentElement;
        // Toggle dark mode class on HTML element
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);
    return (
        <button 
        onClick={()=>setIsDark(prev=>!prev)} // Toggle dark mode on button click
        className='ml-4 px-3 py-1 border rounded text-sm dark:bg-gray-800 dark:text-white bg-gray-200 text-black'
        >
            {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
    );
};

export default ThemeToggle;