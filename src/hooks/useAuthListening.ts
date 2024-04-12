import { signInAutomatically } from "@async-actions";
import { useAppDispatch, useAppSelector, useFirebase, useLoading } from "@hooks";
import { USER_SLICES } from "@slices";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react"

export const useAuthListening = () => {
  const dispatch = useAppDispatch()
  const { auth } = useFirebase()
  const { isLoading, endLoading } = useLoading(true)

  const userId = useAppSelector(state => state.user.user.uid)

  useEffect(() => {
    if (userId) {
      endLoading()
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signInAutomatically(user))
          .finally(() => endLoading())
      } else {
        dispatch(USER_SLICES.clearUser())
        endLoading()
      }
    });

    return () => {
      unsubscribe()
    }
  }, [userId])

  return isLoading
}
