import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import * as MIDDLEWARES from "./middlewares";
import * as REDUCERS from "./slices/reducers";

export const preloadedState = {
	user: {
		user: {
			email: "",
			displayName: "",
			phoneNumber: "",
			uid: "",
			emailVerified: false,
			photoURL: "",
		},
		error: {
			code: "",
			message: "",
		},
	},
	accounts: {
		accounts: [],
		error: {
			code: "",
			message: "",
		},
		status: "",
	},
	categories: {
		categories: [],
		error: {
			code: "",
			message: "",
		},
		status: "",
	},
	transactions: {
		transactions: [],
		error: {
			code: "",
			message: "",
		},
		status: "",
	},
	platform: {
		platform: {
			settings: {},
			currency: {
				EUR: 0,
				PLN: 0,
				RUB: 0,
				USD: 0,
				updatedAt: "",
			},
		},
		error: {
			code: "",
			message: "",
		},
		status: "",
	},
	toast: {
		toasts: [],
	},
};

const rootReducer = combineReducers(REDUCERS);

export const store = configureStore({
	preloadedState,
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			...Object.keys(MIDDLEWARES).reduce((acc, middleware) => {
				// @ts-expect-error: TODO
				return acc.concat(MIDDLEWARES[middleware]);
			}, []),
		),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
