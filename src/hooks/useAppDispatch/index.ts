import { AppDispatch } from "@store";
import { useDispatch } from "react-redux";

/**
 * Custom hook that returns the application dispatch function from the Redux store.
 * @returns The application dispatch function.
 */

export const useAppDispatch = () => useDispatch<AppDispatch>();
