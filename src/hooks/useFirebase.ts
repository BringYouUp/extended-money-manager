
import { auth } from '../../config/firebase'

export const useFirebase = () => {
  return { auth, user: auth.currentUser }
}

export default useFirebase
