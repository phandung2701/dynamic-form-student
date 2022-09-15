import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    page: [],
    form: {},
    previewForm: [],
    selectAttr: [],
    previewTable: [],
  },
  reducers: {
    getPage: (state, action) => {
      return { ...state, page: action.payload };
    },
    setForm: (state, action) => {
      return { ...state, form: action.payload };
    },
    setPreviewForm: (state, action) => {
      return { ...state, previewForm: action.payload };
    },
    setPreviewTable: (state, action) => {
      return { ...state, previewTable: action.payload };
    },
    setSelectAttr: (state, action) => {
      return { ...state, selectAttr: action.payload };
    },
  },
  extraReducers: {},
});

export const { reducer: pageReducer } = pageSlice;
export const {
  getPage,
  setForm,
  setPreviewForm,
  setPreviewTable,
  setSelectAttr,
} = pageSlice.actions;
