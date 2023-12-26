'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react';
import Link from 'next/link';
import { BiMoon, BiBookAlt } from "react-icons/bi";
import { RiComputerLine, RiMoonLine, RiSunLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { setFonts, selectFont } from '@/redux/fontSlice'; 


const Header = () => {
    const [theme, setTheme] = useState('dark');
    const [activeTheme, setActiveTheme] = useState('system');
    const dispatch = useDispatch();
    const font = useSelector(selectFont);

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
    }, [activeTheme]);

    useEffect(() => {
      if (localStorage.font === 'serif') {
        dispatch(setFonts('serif'));
      } else if(localStorage.font === 'roboto') {
        dispatch(setFonts('roboto'));
      } else if (localStorage.font === 'poppins') {
        dispatch(setFonts('poppins'));
      } else if (localStorage.font === 'worksans') {
        dispatch(setFonts('worksans'));
      } else if (localStorage.font === 'notosans') {
        dispatch(setFonts('notosans'));
      } else if (localStorage.font === 'montserrat') {
        dispatch(setFonts('montserrat'));
      } else if (localStorage.font === 'inter') {
        dispatch(setFonts('inter'));
      } else if (localStorage.font === 'inconsolata') {
        dispatch(setFonts('inconsolata'));
      } else if (localStorage.font === 'ubuntu') {
        dispatch(setFonts('ubuntu'));
      } else if (localStorage.font === 'sevillana') {
        dispatch(setFonts('sevillana'));
      } else if (localStorage.font === 'diphylleia') {
        dispatch(setFonts('diphylleia'));
      } else if (localStorage.font === 'lobster') {
        dispatch(setFonts('lobster'));
      } else if (localStorage.font === 'cairo') {
        dispatch(setFonts('cairo'));
      } else if (localStorage.font === 'pacifico') {
        dispatch(setFonts('pacifico'));
      }
    }, [font]);
    
  
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
    };
    const setSystem = () => {
      localStorage.removeItem('theme');
      setTheme('system');
      setActiveTheme('system');
    }
    const handleFontChange = (event) => {
      dispatch(setFonts(event.target.value));
      localStorage.setItem('font', event.target.value);
      localStorage.font = event.target.value;
      event.target.value = localStorage.font;
    }; 
  return (
    <header className={`w-full flex items-center justify-between`}>
        <Link href='/' aria-label='Logo (Dictionary Icon)' className='flex items-center gap-1 md:gap-2'>
        <BiBookAlt className='w-6 h-6 md:w-8 md:h-8'/>
        <p className='font-medium text-xl md:text-2xl'>Lexify</p>
        </Link>

        <div className="flex items-center gap-3">
            <select aria-label='Font switcher: Select your preferred font' value={localStorage.font} onChange={handleFontChange} name="font-select" id="fontSelect" className='w-20 bg-white dark:bg-[#050505] text-black/70 dark:text-white cursor-pointer font-medium outline-0'>
                <option value="serif" aria-label='Select Serif font' aria-selected={font === 'serif'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Serif</option>
                <option value="roboto" aria-label='Select Roboto font' aria-selected={font === 'roboto'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Roboto</option>
                <option value="poppins" aria-label='Select Poppins font' aria-selected={font === 'poppins'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Poppins</option>
                <option value="montserrat" aria-label='Select Montserrat font' aria-selected={font === 'montserrat'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Montserrat</option>
                <option value="notosans" aria-label='Select Notosans font' aria-selected={font === 'notosans'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Noto Sans</option>
                <option value="worksans" aria-label='Select Worksans font' aria-selected={font === 'worksans'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Work Sans</option>
                <option value="inter" aria-label='Select Inter font' aria-selected={font === 'inter'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Inter</option>
                <option value="inconsolata" aria-label='Select Inter font' aria-selected={font === 'inconsolata'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Inconsolata</option>
                <option value="sevillana" aria-label='Select Inter font' aria-selected={font === 'sevillana'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Sevillana</option>
                <option value="cairo" aria-label='Select Inter font' aria-selected={font === 'cairo'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Cairo</option>
                <option value="diphylleia" aria-label='Select Inter font' aria-selected={font === 'diphylleia'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Diphylleia</option>
                <option value="pacifico" aria-label='Select Inter font' aria-selected={font === 'pacifico'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Pacifico</option>
                <option value="lobster" aria-label='Select Inter font' aria-selected={font === 'lobster'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Lobster</option>
                <option value="ubuntu" aria-label='Select Inter font' aria-selected={font === 'ubuntu'} className='w-full text-black dark:text-white cursor-pointer text-sm md:text-lg'>Ubuntu</option>
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