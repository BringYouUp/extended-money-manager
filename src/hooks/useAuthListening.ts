import { signInAutomatically } from "@async-actions/user";
import {
	ACCOUNTS_SLICE,
	CATEGORIES_SLICE,
	PLATFORM_SLICE,
	TOAST_SLICE,
	TRANSACTIONS_SLICE,
	USER_SLICES,
} from "@slices";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useFirebase } from "./useFirebase";
import { useLoading } from "./useLoading";

/**
 * Custom hook for listening to authentication changes.
 * Handles automatic sign-in, loading state, and user data updates.
 * Uses Firebase authentication and internal organization slices for state management.
 * @returns {boolean} Indicates if the hook is currently loading.
 */

export const useAuthListening = () => {
	const dispatch = useAppDispatch();
	const { auth } = useFirebase();
	const { isLoading, endLoading } = useLoading(true);

	const userId = useAppSelector((state) => state.user.user.uid);

	useEffect(() => {
		if (userId) {
			endLoading();
			return;
		}
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(signInAutomatically(user)).finally(() => endLoading());
			} else {
				dispatch(USER_SLICES.clear());
				dispatch(ACCOUNTS_SLICE.clear());
				dispatch(CATEGORIES_SLICE.clear());
				dispatch(PLATFORM_SLICE.clear());
				dispatch(TRANSACTIONS_SLICE.clear());
				dispatch(TOAST_SLICE.clear());
				endLoading();
			}
		});

		return () => {
			unsubscribe();
		};
	}, [userId, endLoading, dispatch, auth]);

	return isLoading;
};
