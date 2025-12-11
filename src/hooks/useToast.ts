import { TOAST_SLICE } from "@slices";

import { uid } from "@utils/common";
import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";

/**
 * Custom hook for managing toast notifications.
 * Uses the provided title, type, and optional description to create a toast notification.
 * The toast is added to the store and removed after 3 seconds.
 * @returns An object with a function 'createToast' to generate toast notifications.
 */

export const useToast = () => {
	const dispatch = useAppDispatch();

	const createToast = useCallback(
		(title: string, type: Store.ToastType, description: string = "") => {
			const toast: Store.Toast = {
				id: uid(),
				title,
				description,
				type,
			};
			dispatch(TOAST_SLICE.addToast(toast));
			setTimeout(() => dispatch(TOAST_SLICE.removeToast(toast)), 3000);
		},
		[],
	);

	return { createToast };
};
