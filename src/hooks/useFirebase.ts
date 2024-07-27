import { auth, db } from "../../config/firebase";

/**
 * Returns an object containing authentication, database, and current user information from Firebase.
 * @returns {Object} An object with properties auth, db, and user.
 */

export const useFirebase = () => {
  return { auth, db, user: auth.currentUser };
};
