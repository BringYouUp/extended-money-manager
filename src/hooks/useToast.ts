import { useAppDispatch } from "@hooks";
import { TOAST_SLICE } from "@slices";
import { uid } from "@utils";
import { useCallback } from "react";

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
    []
  );

  return { createToast };
};
