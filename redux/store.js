// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/redux/searchSlice';
import fontReducer from '@/redux/fontSlice';

const store = configureStore({
  reducer: {
    fonts: fontReducer,
    search: searchReducer,
  },
});

export default store;