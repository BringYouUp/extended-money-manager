import { useAppDispatch, useFirebase, useLoading } from "@hooks";
import { USER_SLICES } from "@slices";
import { getStoreUserFormat } from "@utils";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react"

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