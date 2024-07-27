import {
  signInWithProvider,
  userChangePassword,
  userResetPassword,
  userSignInWithEmailAndPassword,
  userSignUpWithEmailAndPassword,
} from "@async-actions/user";
import { useLoading } from "./useLoading";

import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useErrorToast } from "./useErrorToast";
import { useStoreErrorObserver } from "./useStoreErrorObserver";
import { useToast } from "./useToast";

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  useStoreErrorObserver("user");

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const createErrorToast = useErrorToast();
  const { createToast } = useToast();

  const onForgotPassword = useCallback((email: string) => {
    startLoading({ forgot: true });

    dispatch(userResetPassword({ email }))
      .then(() =>
        createToast(
          "Success",
          "success",
          "A link to reset your password has been sent to your email"
        )
      )
      .catch((err) => createErrorToast("error", err))
      .finally(() => endLoading());
  }, []);

  const onChangePassword = useCallback(
    (oldPassword: string, newPassword: string) => {
      startLoading({ submitting: true });

      dispatch(userChangePassword({ newPassword, oldPassword }))
        .then(() => createToast("Success", "success", "Password changed"))
        .catch((err) => createErrorToast("error", err))
        .finally(() => endLoading());
    },
    []
  );

  const onSignIn = useCallback((email: string, password: string) => {
    startLoading({ submitting: true });

    dispatch(userSignInWithEmailAndPassword({ email, password }))
      .catch((err) => createErrorToast("error", err))
      .finally(() => endLoading());
  }, []);

  const onSignUp = useCallback((email: string, password: string) => {
    startLoading({ submitting: true });

    dispatch(userSignUpWithEmailAndPassword({ email, password }))
      .catch((err) => createErrorToast("error", err))
      .finally(() => endLoading());
  }, []);

  const onSignInWithProvider = useCallback((provider: "google" | "github") => {
    startLoading({ provider });
    dispatch(signInWithProvider({ provider })).finally(() => endLoading());
  }, []);

  return {
    isLoading,
    loadingData,
    onForgotPassword,
    onChangePassword,
    onSignIn,
    onSignUp,
    onSignInWithProvider,
  };
};
