
import { db, auth } from '../../config/firebase'

export const useFirebase = () => {
  return { auth, db, user: auth.currentUser }
}
