import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pageReducer } from "./reducers/pageSlice";
import { studentReducer } from "./reducers/studentSlice";

const rootReducer = combineReducers({
  student: studentReducer,
  pages: pageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
