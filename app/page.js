'use client';
import { useEffect, useState } from 'react'
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import WordDetails from '@/components/WordDetails';
import { useSelector } from 'react-redux';
import { selectFont } from '@/redux/fontSlice';
import { inter, poppins, montserrat, worksans, notoserif, notosans, roboto } from './layout';


export default function Home() {
  const font = useSelector(selectFont);
  const [FONT, setFONT] = useState(notoserif);
  useEffect(() => {
    if (localStorage.font === 'serif') {
      setFONT(notoserif);
    } else if(localStorage.font === 'roboto') {
      setFONT(roboto);
    } else if (localStorage.font === 'poppins') {
      setFONT(poppins);
    } else if (localStorage.font === 'worksans') {
      setFONT(worksans);
    } else if (localStorage.font === 'notosans') {
      setFONT(notosans);
    } else if (localStorage.font === 'montserrat') {
      setFONT(montserrat);
    } else if (localStorage.font === 'inter') {
      setFONT(inter);
    };
  }, [font]);
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center text-black dark:text-white bg-white dark:bg-[#050505] p-5 lg:p-24 ${FONT.className}`}>
      <div className='w-full max-w-2xl min-h-screen bg-white dark:bg-black'>
        <Header />
        <SearchBar />
        <WordDetails />
      </div>
    </main>
  )
}
