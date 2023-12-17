'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  const setLight = () => {
    localStorage.theme = 'light';
    setTheme('light');
  }
  const setDark = () => {
    localStorage.setItem('theme', 'dark')
    localStorage.theme = 'dark';
    setTheme('dark');
  }
  const setSystem = () => {
    localStorage.removeItem('theme');
    setTheme('default');
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black p-10 lg:p-24">
      <div className='w-full max-w-3xl min-h-screen bg-blue-200 dark:bg-white flex justify-between'>
        <button onClick={setDark}>dark</button>
        <button onClick={setLight}>light</button>
        <button onClick={setSystem}>system</button>
      </div>
    </main>
  )
}
