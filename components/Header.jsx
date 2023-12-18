'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react';
import Link from 'next/link';
import { BiMoon, BiBookAlt } from "react-icons/bi";
import { RiComputerLine, RiMoonLine, RiSunLine } from "react-icons/ri";


const Header = ({font}) => {
    const [theme, setTheme] = useState('dark');
    const [activeTheme, setActiveTheme] = useState('system');

    useEffect(() => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
   
    }, [theme]);


    useEffect(() => {
      if (localStorage.theme === 'dark') {
        setActiveTheme('dark');
      } else if(localStorage.theme === 'light') {
        setActiveTheme('light');
      } else if (localStorage.theme === 'system') {
        setActiveTheme('system');
      }
    }, [activeTheme])
    
  
    const setLight = () => {
      localStorage.theme = 'light';
      setTheme('light');
      setActiveTheme('light');
    }
    const setDark = () => {
      localStorage.setItem('theme', 'dark')
      localStorage.theme = 'dark';
      setTheme('dark');
      setActiveTheme('dark');
    }
    const setSystem = () => {
      localStorage.removeItem('theme');
      setTheme('system');
      setActiveTheme('system');
    }
    const handleFontChange = (event) => {
      setSelectedFont(event.target.value);
    }
  return (
    <header className={`w-full flex items-center justify-between ${font}`}>
        <Link href='/' aria-label='Logo (Dictionary Icon)' className='flex items-center gap-1 md:gap-2'>
        <BiBookAlt className='w-6 h-6 md:w-8 md:h-8'/>
        <p className='font-medium text-xl md:text-2xl font-roboto'>Lexify</p>
        </Link>

        <div className="flex items-center gap-3">
            <select onChange={handleFontChange} name="font-select" id="fontSelect" className='w-20 bg-white dark:bg-[#050505] text-black/70 dark:text-white cursor-pointer font-medium outline-0'>
                <option value="font-serif" className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Serif</option>
                <option value="font-roboto" className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Roboto</option>
            </select>
            <div role='radiogroup' className="flex gap-0 rounded-full p-1 border border-[#ebebebs] dark:border-[#2e2e2e]">
                <button aria-checked={`${activeTheme === 'dark'? 'true' : 'false'}`} aria-label='Switch to dark theme' role='radio' onClick={setDark} className={`group rounded-full p-2  ${activeTheme === 'dark'? 'bg-[#E6E6E6] dark:bg-[#292929]' : ''}`}>
                <RiMoonLine className={`w-3 h-3 group-hover:text-black group-hover:dark:text-white ${activeTheme === 'dark'? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'}`} />
                </button>
                <button aria-checked={`${activeTheme === 'system'? 'true' : 'false'}`} aria-label='Switch to default system theme' role='radio' onClick={setSystem} className={`group rounded-full p-2 ${activeTheme === 'system'? 'bg-[#E6E6E6] dark:bg-[#292929]' : ''}`}>
                <RiComputerLine className={`w-3 h-3 group-hover:text-black group-hover:dark:text-white ${activeTheme === 'system'? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'}`} />
                </button>
                <button aria-checked={`${activeTheme === 'light'? 'true' : 'false'}`} aria-label='Switch to light theme' role='radio' onClick={setLight} className={`group rounded-full p-2 ${activeTheme === 'light'? 'bg-[#E6E6E6] dark:bg-[#292929]' : ''}`}>
                <RiSunLine className={`w-3 h-3 group-hover:text-black group-hover:dark:text-white ${activeTheme === 'light'? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'}`} />
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header