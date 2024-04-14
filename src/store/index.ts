/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combineReducers } from "redux";
import * as REDUCERS from './slices/reducers'
import * as MIDDLEWARES from './middlewares'
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
  },
  accounts: {
    accounts: [],
    error: {
      code: '',
      message: ''
    },
    status: ''
  },
  categories: {
    categories: [],
    error: {
      code: '',
      message: ''
    },
    status: ''
  },
  transactions: {
    transactions: [],
    error: {
      code: '',
      message: ''
    },
    status: ''
  },
  platform: {
    platform: {
      settings: {}
    },
    error: {
      code: '',
      message: ''
    },
    status: ''
  }
}

const rootReducer = combineReducers(REDUCERS);

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  devTools: true,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(Object.keys(MIDDLEWARES).reduce((acc, middleware) => { return acc.concat(MIDDLEWARES[middleware]) }, []))),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch