import { useCallback } from "react";
import { useToast } from "./useToast";

export const useErrorToast = () => {
	const { createToast } = useToast();

	const createErrorToast = useCallback(
		(title: string, error: Error) => {
			createToast(title, "error", error?.message);
		},
		[createToast],
	);

	return createErrorToast;
};
