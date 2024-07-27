import { RootState } from "@store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

/**
 * Custom hook that provides typed access to the Redux store state.
 * @returns The selected state from the Redux store.
 */

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
