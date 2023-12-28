'use client'
import React, { useState, useEffect, useRef } from 'react'
import { RiCloseLine, RiSearch2Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { selectFont } from '@/redux/fontSlice';
import { selectSearchQuery, setSearchQuery } from '@/redux/searchSlice';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const SearchBar = ({fetchWord}) => {

const query = useSelector(selectSearchQuery);
const dispatch = useDispatch();
const [recentSearches, setRecentSearches] = useState([]);
const [isTyping, setIsTyping] = useState(false);
const inputRef = useRef(null);
const [inputValue, setInputValue] = useState('');
const [localStorageState, setLocalStorageState] = useState({});
const containerRef = useRef(null);

useEffect(() => {
  setLocalStorageState(localStorage);
  const storedSearches = localStorage.recentSearches;
  if (storedSearches) {
    setRecentSearches(JSON.parse(storedSearches));
  }
}, []);

const handleQueryChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
    console.log(query);
    setInputValue(event.target.value);
};

const handleFetchWord =()=> {
  if(query === ''){
    if(typeof window !== undefined){
      if(localStorageState.theme === 'light'){
        toast.warn('Searchbar is empty', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'dark'
        })
      }
      if(localStorageState.theme === 'dark'){
        toast.warn('Searchbar is empty', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'light'
        })
      }
      if(!localStorageState.theme){
        toast.warn('Searchbar is empty', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
          style: {backgroundColor: '#A646ED'},
          progressStyle: {backgroundColor: '#CBB6E6'},
        })
      }
    }
  } else{
    let isDuplicate = recentSearches.includes(query);
    let updatedSearches;
    if(isDuplicate){
      updatedSearches = [query, ...recentSearches.filter((search) => search !== query).slice(0,4)];
    } else {
      updatedSearches = [query, ...recentSearches.slice(0, 4)];
    };
    setRecentSearches(updatedSearches);
    if(typeof window !== undefined){
      localStorageState.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    setIsTyping(false);
    fetchWord();
  }
}

const handleRecentSearchClick = (search) => {
  dispatch(setSearchQuery(search));
  inputRef.current.value = search;
  setIsTyping(false);
};

const clearRecentSearch = (searchToRemove) => {
  const updatedSearches = recentSearches.filter((search) => search !== searchToRemove);
  setRecentSearches(updatedSearches);
  if(typeof window !== undefined){
  localStorageState.setItem('recentSearches', JSON.stringify(updatedSearches));
  }
};

const clearAllRecentSearches = () => {
  setRecentSearches([]);
  if(typeof window !== undefined){
  localStorageState.removeItem('recentSearches');
  }
};

const filteredRecentSearches = recentSearches.filter((search) =>
search.toLowerCase().includes(inputValue.toLowerCase())
);

const handleDocumentClick = (event) => {
  if (containerRef.current && !containerRef.current.contains(event.target)) {
    setIsTyping(false);
  }
};

useEffect(() => {
  document.addEventListener('click', handleDocumentClick);

  return () => {
    document.removeEventListener('click', handleDocumentClick);
  };
}, []);

  return (
    <div ref={containerRef} className={`w-full flex flex-col px-3 py-2 bg-[#F4F4F4] dark:bg-[#1F1F1F] rounded-md mt-10 group`}>
        <div className={`w-full h-full py-1 flex items-center justify-between ${isTyping ? 'border-b' : ''} border-b-[#bebebe] dark:border-b-[#696868]`}>
        <input ref={inputRef} onChange={handleQueryChange} onFocus={() => setIsTyping(true)} onKeyDown={(e) => { if (e.key === 'Enter') { handleFetchWord();}}}  placeholder='Search any english word' type="text" className='w-full h-full bg-transparent outline-0 border-none input' />
        <button onClick={handleFetchWord} className='ml-2 rounded-full p-1 focus:bg-[#E9D0FA] hover:bg-[#E9D0FA] input-focus:bg-[#E9D0FA]'>
          <RiSearch2Line className='w-4 h-4 text-[#A646ED]' />
        </button>
        </div>
        <div className={`w-full p-4 mt-3 transition-all duration-500 ${isTyping ? 'block scale-100' : 'hidden scale-0'}`}>
        {
          localStorageState.recentSearches && inputValue.length === 0 && (
            <h1 className='text-lg text-gray-600'>Recent searches</h1>
          )
        }
          {
            inputValue.length === 0 && recentSearches.length > 0 && (
              <ul className="w-full flex flex-col flex-wrap gap-2 my-3" id="searchHistory">
              {recentSearches.map((search, index) => (
                <li onClick={() => handleRecentSearchClick(search)} className='w-full flex items-center justify-between p-2 hover:bg-[#c6bbcf54] rounded-sm cursor-pointer' key={index}>
                  <p className='text-sm text-[#A646ED]'>{search}</p>
                  <button onClick={(event) =>{event.stopPropagation(); clearRecentSearch(search);}} className='p-1 hover:bg-slate-400 dark:hover:bg-slate-400 focus:bg-slate-200 rounded-full'><RiCloseLine className='w-4 h-4 text-gray-800 dark:text-white/60' /></button>
                </li>
              ))} 
              </ul> 
             )
          }

          {
            inputValue.length > 0 && filteredRecentSearches.length > 0 && (
              <ul className="w-full flex flex-col flex-wrap gap-2 my-3" id="searchHistory">
              {filteredRecentSearches.map((search, index) => (
                <li onClick={() => handleRecentSearchClick(search)} className='w-full flex items-center justify-between p-2 hover:bg-[#c6bbcf54] rounded-sm cursor-pointer' key={index}>
                  <p className='text-sm text-[#A646ED]'>{search}</p>
                  <button onClick={(event) =>{event.stopPropagation(); clearRecentSearch(search);}} className='p-1 hover:bg-slate-400 dark:hover:bg-slate-400 focus:bg-slate-200 rounded-full'><RiCloseLine className='w-4 h-4 text-gray-800 dark:text-white/60' /></button>
                </li>
              ))} 
              </ul> 
            )
          }

          {
            inputValue.length > 0 && filteredRecentSearches.length === 0 && (
              <p>No matching searches</p>
            )
          }

          <div className="w-full flex items-center justify-end">
          {localStorageState.recentSearches && inputValue.length === 0 && (
            <button onClick={() => clearAllRecentSearches()} className='text-sm text-gray-500 font-medium px-2 py-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-400'>Clear all</button>
          )}
          </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default SearchBar