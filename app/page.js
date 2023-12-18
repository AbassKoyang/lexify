'use client';
import { useEffect, useState } from 'react'
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [selectedFont, setSelectedFont] = useState('font-serif');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-black dark:text-white bg-white dark:bg-[#050505] p-5 lg:p-24">
      <div className='w-full max-w-2xl min-h-screen bg-white dark:bg-black'>
        <Header font={selectedFont} setSelectedFont={setSelectedFont} />
        <SearchBar />
      </div>
    </main>
  )
}
