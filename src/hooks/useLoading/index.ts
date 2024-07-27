/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Custom hook for managing loading state and data in a component.
 *
 * @param initialState - The initial loading state (default: false).
 * @param initialData - The initial loading data (default: empty object).
 * @returns An object containing isLoading state, functions to start and end loading, and the loading data.
 */

import { useRef, useState } from "react";

type useLoadingDataType = {
  [key: string]: any;
};

export const INITIAL_LOADING_DATA = {};

export const useLoading = (
  initialState: boolean = false,
  initialData: useLoadingDataType = {}
) => {
  const loadingData = useRef<useLoadingDataType>(INITIAL_LOADING_DATA);

  const [loading, setLoading] = useState<boolean>(() => {
    if (initialState) {
      loadingData.current = initialData;
    }
    return initialState;
  });

  const startLoading = (data?: useLoadingDataType) => {
    if (data) {
      loadingData.current = data;
    }
    setLoading(true);
  };

  const endLoading = () => {
    loadingData.current = INITIAL_LOADING_DATA;
    setLoading(false);
  };

  return { isLoading: loading, startLoading, endLoading, loadingData };
};
