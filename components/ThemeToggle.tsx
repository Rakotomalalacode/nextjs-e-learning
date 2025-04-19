'use client'

import { useEffect, useState } from 'react'
import { IoMoonSharp, IoSunny } from 'react-icons/io5'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        // vérifie si dark mode est actif dans localStorage
        const storedTheme = localStorage.getItem('theme')
        if (
            storedTheme === 'dark' ||
            (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        }
    }, [])

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setTheme('light')
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="border bg-oranground/10 border-oranground text-oranground rounded-sm p-2 px-3"
        >
            {theme === 'light' ? <IoMoonSharp />  : <IoSunny />}
        </button>
    )
}
