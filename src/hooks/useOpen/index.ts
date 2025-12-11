import { useCallback, useState } from "react";

/**
 * Custom hook to manage the visibility state of modal/dropdown/drawer.
 *
 * @param initialState - The initial visibility state (default is false).
 * @returns A tuple containing the current visibility state, a function to set visibility to true, and a function to set visibility to false.
 */

export const useOpen = (
	initialState: boolean = false,
): [boolean, () => void, () => void] => {
	const [isVisible, setIsVisible] = useState<boolean>(initialState);

	const onOpen = useCallback(() => setIsVisible(true), []);
	const onClose = useCallback(() => setIsVisible(false), []);

	return [isVisible, onOpen, onClose];
};
