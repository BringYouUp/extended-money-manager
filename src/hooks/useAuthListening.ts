import { signInAutomatically } from "@async-actions";
import {
  useAppDispatch,
  useAppSelector,
  useFirebase,
  useLoading,
} from "@hooks";
import {
  ACCOUNTS_SLICE,
  CATEGORIES_SLICE,
  PLATFORM_SLICE,
  TOAST_SLICE,
  TRANSACTIONS_SLICE,
  USER_SLICES,
} from "@slices";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const useAuthListening = () => {
  const dispatch = useAppDispatch();
  const { auth } = useFirebase();
  const { isLoading, endLoading } = useLoading(true);

  const userId = useAppSelector((state) => state.user.user.uid);

  useEffect(() => {
    if (userId) {
      endLoading();
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signInAutomatically(user)).finally(() => endLoading());
      } else {
        dispatch(USER_SLICES.clear());
        dispatch(ACCOUNTS_SLICE.clear());
        dispatch(CATEGORIES_SLICE.clear());
        dispatch(PLATFORM_SLICE.clear());
        dispatch(TRANSACTIONS_SLICE.clear());
        dispatch(TOAST_SLICE.clear());
        endLoading();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return isLoading;
};
