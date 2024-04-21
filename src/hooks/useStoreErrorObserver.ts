import { useAppSelector, useToast } from "@hooks";
import { RootState } from "@store";
import { useEffect } from "react";

export const useStoreErrorObserver = (key: Exclude<keyof RootState, 'toast'>) => {
  const error = useAppSelector((state) => state[key].error);
  const { createToast } = useToast();

  useEffect(() => {
    if (error.code) {
      createToast(error.code, "error", error.message);
    }
  }, [error.code]);
};
