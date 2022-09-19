import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    page: {},
  },
  reducers: {
    getPageItem: (state, action) => {
      return { ...state, page: action.payload };
    },
  },
  extraReducers: {},
});

export const { reducer: studentReducer } = studentSlice;
export const { getPageItem } = studentSlice.actions;
