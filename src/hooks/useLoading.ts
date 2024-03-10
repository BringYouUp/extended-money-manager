import { useRef, useState } from "react";

type useLoadingDataType = {
  [key: string]: any
}

const useLoading = (initialState: boolean = false, initialData: useLoadingDataType = {}) => {
  const loadingData = useRef<useLoadingDataType>();

  const [loading, setLoading] = useState<boolean>(() => {
    if (initialState) {
      loadingData.current = initialData
    }
    return initialState
  });

  const startLoading = (data?: useLoadingDataType) => {
    if (data) {
      loadingData.current = data;
    }
    setLoading(true);
  };

  const endLoading = () => {
    loadingData.current = {};
    setLoading(false);
  };

  return { isLoading: loading, startLoading, endLoading, loadingData }
};

export default useLoading;