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
import { inter, poppins, montserrat, worksans, notoserif, notosans, roboto, diphylleia, sevillana, ubuntu, lobster, inconsolata, cairo, pacifico } from './layout';
import { fetchWordData } from '@/utils';
import { RiSearch2Line } from 'react-icons/ri';
import {BounceLoader} from 'react-spinners'
import { CarRepairRounded } from '@mui/icons-material';


export default function Home() {
  const query = useSelector(selectSearchQuery);
  const [wordData, setWordData] = useState(null);
  const font = useSelector(selectFont);
  const [isLoading, setIsLoading] = useState(false);
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
    } else if (localStorage.font === 'diphylleia') {
      setFONT(diphylleia);
    } else if (localStorage.font === 'sevillana') {
      setFONT(sevillana);
    }else if (localStorage.font === 'inconsolata') {
      setFONT(inconsolata);
    } else if (localStorage.font === 'ubuntu') {
      setFONT(ubuntu);
    } else if (localStorage.font === 'cairo') {
      setFONT(cairo);
    } else if (localStorage.font === 'pacifico') {
      setFONT(pacifico);
    } else if (localStorage.font === 'lobster') {
      setFONT(lobster);
    }
  }, [font]);

  const fetchWord = async () => {
    setIsLoading(true);
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
    } finally{
      setIsLoading(false);
    }
};

  return (
    <main className={`flex ${wordData ? 'min-h-screen' : 'h-screen'} flex-col items-center justify-center text-black dark:text-white bg-white dark:bg-[#050505] p-5 lg:px-24 lg:pt-24 ${FONT.className}`}>
      <div className='w-full max-w-2xl h-full flex flex-col items-center justify-center bg-white dark:bg-black'>
        <Header />
        <SearchBar fetchWord={fetchWord} />
        {isLoading ? (
          <div className='w-full h-[500px] lg:h-[300px] flex flex-col items-center justify-center'>
          <BounceLoader color='#A646ED' />
          </div>
        ) : (
           <>
            {
             wordData ? (
              <WordDetails wordData={wordData} />
            ) : (
                <div className='w-full h-[500px] lg:h-[300px] flex flex-col items-center justify-center'>
                  <RiSearch2Line className='w-28 h-28 text-[#E9D0FA]' />
                  <p className='text-sm mt-3 text-center'>Search any english word. 🚀</p>
                </div>
            )
           }
           </>
        )}
      </div>
    </main>
  )
}
