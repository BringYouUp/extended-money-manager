import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react"
import { useAppDispatch, useFirebase, useLoading } from ".";
import { USER_SLICES } from "../store/slices/slices";
import { getStoreUserFormat } from "../utils";

const useAuthListening = () => {
  const dispatch = useAppDispatch()
  const { auth } = useFirebase()
  const { isLoading, endLoading } = useLoading(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(USER_SLICES.setUser(getStoreUserFormat(user)))
        endLoading()
      } else {
        dispatch(USER_SLICES.clearUser())
        endLoading()
      }
    });
  }, [])

  return isLoading
}

export default useAuthListening