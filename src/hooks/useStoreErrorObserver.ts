import { RootState } from "@store";
import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { useToast } from "./useToast";

export const useStoreErrorObserver = (
  key: Exclude<keyof RootState, "toast">
) => {
  const error = useAppSelector((state) => state[key].error);
  const { createToast } = useToast();

  useEffect(() => {
    if (error && error.code) {
      createToast(error.code, "error", error.message);
    }
  }, [error?.code]);
};
