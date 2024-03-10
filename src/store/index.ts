import { combineReducers } from "redux";
import * as REDUCERS from './slices/reducers'
import { configureStore } from "@reduxjs/toolkit";

const preloadedState = {
  user: {
    user: {
      email: '',
      displayName: '',
      phoneNumber: '',
      uid: '',
      emailVerified: false,
      photoURL: ''
    },
    error: {
      code: '',
      message: ''
    },
  }
}

const rootReducer = combineReducers(REDUCERS);

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch