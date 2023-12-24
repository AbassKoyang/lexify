import React, { useState, useEffect } from 'react';
import { RiPlayFill, RiPauseFill } from "react-icons/ri";


const AudioPlayer = ({src}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
      const audioPlayer = document.getElementById("audio-player");
        if (isPlaying) {
            audioPlayer.pause();  
            setIsPlaying(false);
        }else {
            audioPlayer.play();
            setIsPlaying(true);
        } 
    }
    
  useEffect(() => {
    const audioPlayer = document.getElementById('audio-player');

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioPlayer.addEventListener('ended', handleEnded);

    return () => {
      audioPlayer.removeEventListener('ended', handleEnded);
    };
  }, []);
  return (
    <div>
        <button onClick={togglePlay} className='p-3 rounded-full bg-[#E9D0FA] flex justify-center items-center'>
         {
            isPlaying ? (
                <RiPauseFill className='w-8 h-8 text-[#A646ED]' />
            ) : (
                <RiPlayFill className='w-8 h-8 text-[#A646ED]' />
            )
         }
        </button>
        <audio id='audio-player' className='hidden' controls src={src}>Audio not supported.</audio>
    </div>
  )
}

export default AudioPlayer