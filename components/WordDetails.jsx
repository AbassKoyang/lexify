'use client'
import React, {useState, useEffect} from 'react';
import AudioPlayer from './AudioPlayer';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';


const WordDetails = ({wordData}) => {
    const {word, phonetic, phonetics, sourceUrls, meanings} = wordData[0] || [];
    const [audioSrc, setAudioSrc] = useState('');
    const [showmore, setShowmore] = useState(false);
    const [IndvToggle, setIndvToggle] = useState(Array.isArray(meanings) ? meanings.map(()=> false) : []);

    useEffect(() => {
      // Find the first object in the array that has a non-empty audio property
      const firstValidPhonetic = phonetics ? phonetics.find((item) => item.audio && item.audio !== '') : '' ;
  
      if (firstValidPhonetic) {
        setAudioSrc(firstValidPhonetic.audio);
      } else {
        setAudioSrc(''); 
      }
    }, [phonetics]);

    const handleToggle = (index) => {
      // Toggle the state for the clicked item
      setIndvToggle((prevStates) =>
        prevStates.map((prevState, i) => (i === index ? !prevState : prevState))
      );
    };
  return (
    <section className="w-full flex flex-col items-center justify-center">
        {wordData.length < 1 ? (
          <div className="w-full h-[500px] lg:h-[300px] flex flex-col justify-center items-center">
            <h1 className='text-5xl font-bold text-center text-[#E9D0FA]'>Oh no!</h1>
            <p className='text-sm mt-3 text-center max-w-xl'>The word you're seeking is off on a linguistic adventure. Can you embark on one with a different word? 🚀</p>
          </div>
        ) : (
        <div className="w-full">
            <div className="w-full flex items-center justify-between mt-7">
              <div className="">
              <h1 className='text-4xl text-black dark:text-white font-bold capitalize'>{word}</h1>
              <p aria-label={`${word} Transcription`} className='text-lg text-[#E9D0FA]'>{phonetic}</p>
              </div>
              <AudioPlayer src={audioSrc}/>
            </div>
            <div>
              { !showmore ? (
                meanings.slice(0, 3).map((meaning, index) => {
                  const {partOfSpeech, definitions, synonyms, antonyms} = meaning;
                  return(
                    <div key={`${definitions[0]}`} className='mt-7'>
                    <div className="w-full flex items-center justify-between">
                      <h1 className='text-black dark:text-white font-bold text-lg'>{partOfSpeech}</h1>
                      <div className="w-full h-[2px] ml-4 bg-[#F4F4F4] dark:bg-[#1F1F1F]">
                      </div>
                    </div>
                    <h1 className='text-lg font-normal text-gray-600 mt-5'>Meaning</h1>
                    <ul className='list-disc text-[#E9D0FA] pl-4'>
                    {IndvToggle[index] ? (
                      definitions.map((def, index) => {
                        const { example, definition } = def;
                        return (
                          <li key={index} className='mt-3 text-sm text-[#A646ED]'>
                            <p className='text-sm text-gray-900 dark:text-white/80'>{definition}</p>
                            <br />
                            {example && <span className='mt-2 text-sm text-gray-900 dark:text-white/90'>Example: {example}</span>}
                          </li>
                        );
                      })
                    ) : (
                      definitions.slice(0, 4).map((def, index) => {
                        const { example, definition } = def;
                        return (
                          <li key={index} className='mt-3 text-sm text-[#A646ED]'>
                            <p className='text-sm text-gray-900 dark:text-white/80'>{definition}</p>
                            <br />
                            {example && <span className='mt-2 text-sm text-gray-900 dark:text-white/90'>Example: {example}</span>}
                          </li>
                        );
                      })
                    )
                    }
                    </ul>

                    {definitions.length > 3 && (
                          <div className='w-full flex items-center justify-center my-3'>
                            <button className='flex items-center justify-center gap-0 p-2 text-[#A646ED]' onClick={() => handleToggle(index)}>{IndvToggle[index]? (<p className='font-medium'>Show less</p>):(<p className='font-medium'>Show more</p>)}{IndvToggle[index]? (<RiArrowUpSLine className='w-7 h-7' />):(<RiArrowDownSLine className='w-7 h-7' />)} </button>
                          </div>
                    )}

                    <h1 className='text-lg font-normal text-gray-600 mt-5'>Synonyms:</h1>
                      <p className='text-sm font-normal text-[#E9D0FA] mt-2 capitalize'>
                        {synonyms?.length ? synonyms.join(', ') : 'No Synonyms'}
                      </p>
                    <h1 className='text-lg font-normal text-gray-600 mt-3'>Antonyms:</h1>
                      <p className='text-sm font-normal text-[#E9D0FA] mt-2 capitalize'>
                        {antonyms?.length ? antonyms.join(', ') : 'No Antonyms'}
                      </p>
                  </div>
                  )
                })
                ) : (
                meanings.map((meaning, index) => {
                  const {partOfSpeech, definitions, synonyms, antonyms} = meaning;
                  return(
                    <div key={`${definitions[0]}`} className='mt-5'>
                      <div className="w-full flex items-center justify-between">
                        <h1 className='text-black dark:text-white font-bold text-lg'>{partOfSpeech}</h1>
                        <div className="w-full h-[2px] ml-4 bg-[#F4F4F4] dark:bg-[#1F1F1F]">
                        </div>
                      </div>
                      <h1 className='text-lg font-normal text-gray-600 mt-5'>Meaning</h1>
                      <ul className='list-disc text-[#E9D0FA] pl-4'>
                      {IndvToggle[index] ? (
                      definitions.map((def, index) => {
                        const { example, definition } = def;
                        return (
                          <li key={index} className='mt-3  text-sm text-[#A646ED]'>
                            <p className='text-sm text-gray-900 dark:text-white/80'>{definition}</p>
                            <br />
                            {example && <span className='mt-2  text-sm text-gray-900 dark:text-white/90'>Example: {example}</span>}
                          </li>
                        );
                      })
                    ) : (
                      definitions.slice(0, 4).map((def, index) => {
                        const { example, definition } = def;
                        return (
                          <li key={index} className='mt-3  text-sm text-[#A646ED]'>
                            <p className='text-sm text-gray-900 dark:text-white/80'>{definition}</p>
                            <br />
                            {example && <span className='mt-2 text-sm text-gray-900 dark:text-white/90'>Example: {example}</span>}
                          </li>
                        );
                      })
                    )
                    }
                      </ul>

                      {definitions.length > 3 && (
                          <div className='w-full flex items-center justify-center my-3'>
                            <button className='flex items-center justify-center gap-0 p-2 text-[#A646ED]' onClick={() => handleToggle(index)}>{IndvToggle[index]? (<p className='font-medium'>Show less</p>):(<p className='font-medium'>Show more</p>)}{IndvToggle[index]? (<RiArrowUpSLine className='w-7 h-7' />):(<RiArrowDownSLine className='w-7 h-7' />)} </button>
                          </div>
                    )}

                      <h1 className='text-lg font-normal text-gray-600 mt-3'>Synonyms:</h1>
                      <p className='text-sm font-normal text-[#E9D0FA] mt-3 capitalize'>
                        {synonyms?.length ? synonyms.join(', ') : 'No Synonyms'}
                      </p>
                      <h1 className='text-lg font-normal text-gray-600 mt-3'>Antonyms:</h1>
                      <p className='text-sm font-normal text-[#E9D0FA] mt-3 capitalize'>
                        {antonyms?.length ? antonyms.join(', ') : 'No Antonyms'}
                      </p>
                    </div>
                  )
                })
                )
              }


              {meanings.length > 3 && (
                <div className='w-full flex items-center justify-center my-6'>
                  <button className='flex items-center justify-center gap-0 px-3 py-2 bg-[#A646ED] text-white rounded-md' onClick={() => setShowmore(!showmore)}>{showmore? (<p className='text-sm'>Show less</p>):(<p className='text-sm'>Show more</p>)}{showmore? (<RiArrowUpSLine className='w-7 h-7'/>):(<RiArrowDownSLine className='w-7 h-7'/>)} </button>
                </div>
              )}



            <div className='w-full flex flex-col flex-wrap'>
              <div className="w-full h-[2px] my-4 bg-[#F4F4F4] dark:bg-[#1F1F1F]" />
              <h1 className='text-lg font-normal text-gray-600'>Source(s):</h1>
              {sourceUrls.map((url) => (
                <a href={url} className='text-sm font-normal text-[#A646ED] underline underline-offset-1' target="_blank" rel="noopener noreferrer" key={url}>{url}</a>
              ))}
              </div>
            </div>
        </div>
        )}
    </section>
  )
}

export default WordDetails;