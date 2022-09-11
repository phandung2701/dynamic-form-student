import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    page: [],
    form: {},
  },
  reducers: {
    getPage: (state, action) => {
      return { ...state, page: action.payload };
    },
    setForm: (state, action) => {
      return { ...state, form: action.payload };
    },
  },
  extraReducers: {},
});

export const { reducer: pageReducer } = pageSlice;
export const { getPage, setForm } = pageSlice.actions;
