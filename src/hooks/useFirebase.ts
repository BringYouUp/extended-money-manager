import { auth, db } from "../../config/firebase";

export const useFirebase = () => {
  return { auth, db, user: auth.currentUser };
};
