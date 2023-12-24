'use client'
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { selectFont } from '@/redux/fontSlice';
import { selectSearchQuery, setSearchQuery } from '@/redux/searchSlice';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SearchBar = ({fetchWord}) => {
const query = useSelector(selectSearchQuery);
const dispatch = useDispatch();
const handleQueryChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
    console.log(query);
}
const handleFetchWord =()=> {
  if(query === ''){
    if(localStorage.theme === 'light'){
      toast.warn('Searchbar is empty', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
      })
    }
    if(localStorage.theme === 'dark'){
      toast.warn('Searchbar is empty', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'light'
      })
    }
    if(!localStorage.theme){
      toast.warn('Searchbar is empty', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
        style: {backgroundColor: '#A646ED'},
        progressStyle: {backgroundColor: '#CBB6E6'},
      })
    }
  } else{
    fetchWord();
  }
}
  return (
    <div className={`w-full flex items-center justify-between px-3 py-2 bg-[#F4F4F4] dark:bg-[#1F1F1F] rounded-md mt-10 group`}>
        <input onChange={handleQueryChange} placeholder='Search any english word' type="text" className='w-full h-full bg-transparent outline-0 border-none input' />
        <button onClick={handleFetchWord} className='ml-2 rounded-full p-1 focus:bg-[#E9D0FA] hover:bg-[#E9D0FA] input-focus:bg-[#E9D0FA]'>
          <RiSearch2Line className='w-4 h-4 text-[#A646ED]' />
        </button>
        <ToastContainer />
    </div>
  )
}

export default SearchBar