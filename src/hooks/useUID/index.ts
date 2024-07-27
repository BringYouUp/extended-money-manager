import { useAppSelector } from "@hooks/useAppSelector";

/**
 * Custom hook to return the user ID from the Redux store.
 * Uses the internal organization's selector hook for type-safe access.
 *
 * @returns {string} The user ID retrieved from the Redux store.
 */

export const useUID = () => {
  const uid = useAppSelector((state) => state.user.user.uid);

  return uid;
};
