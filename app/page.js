'use client';
import { useEffect, useState } from 'react'
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import WordDetails from '@/components/WordDetails';
import { useSelector } from 'react-redux';
import { selectFont } from '@/redux/fontSlice';
import { selectSearchQuery } from '@/redux/searchSlice';
import { inter, poppins, montserrat, worksans, notoserif, notosans, roboto } from './layout';
import { fetchWordData } from '@/utils';


export default function Home() {
  const query = useSelector(selectSearchQuery);
  const [wordData, setWordData] = useState(null);
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

  const fetchWord = async () => {
    try {
        const word = await fetchWordData(query);
        
        if (word) {
            if (word instanceof Response && word.status === 404) {
                // Handle 404 error
                console.log('Word not found.');
                setWordData([]);
                // You can set state or perform other actions as needed
            } else {
                // Word found, update state or perform other actions
                setWordData(word);
                console.log(word);
            }
        }
    } catch (error) {
        console.error('Error fetching word:', error);
    }
};

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center text-black dark:text-white bg-white dark:bg-[#050505] p-5 lg:p-24 ${FONT.className}`}>
      <div className='w-full max-w-2xl min-h-screen bg-white dark:bg-black'>
        <Header />
        <SearchBar fetchWord={fetchWord} />
        {wordData ? (
          <WordDetails wordData={wordData} />
        ) : (
          <div className='w-full flex items-center justify-center'>
            <h1>Search for a word</h1>
          </div>
        )}
      </div>
    </main>
  )
}
