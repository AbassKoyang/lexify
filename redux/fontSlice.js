import { createSlice } from "@reduxjs/toolkit";

const fontSlice = createSlice({
    name: 'fonts',
    initialState: {
        selectedFont: 'font-serif',
    },
    reducers: {
        setFonts: (state, action) => {
          state.selectedFont = action.payload;
        },
      },
})
export const { setFonts } = fontSlice.actions;
export const selectFont = (state) => state.fonts.selectedFont;
export default fontSlice.reducer;