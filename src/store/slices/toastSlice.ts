import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Store.ToastSelector = {
	toasts: [],
};

const toastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		addToast: (state, { payload }: PayloadAction<Store.Toast>) => {
			state.toasts.push(payload);
		},
		removeToast: (state, { payload }: PayloadAction<Store.Toast>) => {
			const idx = state.toasts.findIndex((toast) => toast.id === payload.id);
			if (idx !== -1) {
				state.toasts.splice(idx, 1);
			}
		},
		clear: (store) => {
			store.toasts = initialState.toasts;
		},
	},
});

export const { addToast, removeToast, clear } = toastSlice.actions;

export default toastSlice.reducer;
