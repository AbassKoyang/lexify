'use client'
import React, {useState, useEffect} from 'react';
import AudioPlayer from './AudioPlayer';


const WordDetails = ({wordData}) => {
    const {word, phonetic, phonetics, sourceUrls, meanings} = wordData[0] || [];
    const [audioSrc, setAudioSrc] = useState('')
    useEffect(() => {
      // Find the first object in the array that has a non-empty audio property
      const firstValidPhonetic = phonetics.find((item) => item.audio && item.audio !== '');
  
      if (firstValidPhonetic) {
        setAudioSrc(firstValidPhonetic.audio);
      } else {
        setAudioSrc(''); 
      }
    }, [phonetics]);
  return (
    <section className="w-full">
        {wordData.length < 1 ? (
          <h1>Word not found.</h1>
        ) : (
        <div className="w-full">
            <div className="w-full flex items-center justify-between mt-5">
              <div className="">
              <h1 className='text-4xl text-black dark:text-white font-bold capitalize'>{word}</h1>
              <p className='text-lg text-[#E9D0FA]'>{phonetic}</p>
              </div>
              <AudioPlayer src={audioSrc}/>
            </div>
            <div>
              {
                meanings.map((meaning) => {
                  const {partOfSpeech, definitions, synonyms, antonyms} = meaning;
                  return(
                    <div key={`${definitions[0]}`} className='mt-5'>
                    <div className="w-full flex items-center justify-between">
                      <h1 className='text-black dark:text-white font-bold text-lg'>{partOfSpeech}</h1>
                      <div className="w-full h-[2px] ml-4 bg-[#F4F4F4] dark:bg-[#1F1F1F]">
                      </div>
                    </div>
                    <h1 className='text-lg font-normal text-gray-600 mt-5'>Meaning</h1>
                    <ul>
                      {definitions.map((def) => {
                      const {example, definition} = def;
                      return(
                        <li className='mt-3 ml-4 text-sm list-disc text-gray-900 dark:text-white/45'>
                          {definition}
                          <br/>
                          { example && <span className='mt-2'>Example: {example}</span>}
                        </li>
                      )
                      })}
                    </ul>
                  </div>
                  )
                })
              }
            {sourceUrls.map((url) => (
              <a href={url} target="_blank" rel="noopener noreferrer" key={url}>{url}</a>
            ))}
            </div>
        </div>
        )}
    </section>
  )
}

export default WordDetails;