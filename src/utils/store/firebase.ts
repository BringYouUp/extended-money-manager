import { collection, doc } from "firebase/firestore";
import { db } from '../../../config/firebase'

export const getRef = {
  user: (uid: string) => doc(db, "users", uid),
  profile: (uid: string) => collection(db, "users", uid, 'profile'),
  accounts: (uid: string) => collection(db, "users", uid, "accounts"),
  categories: (uid: string) => collection(db, "users", uid, "categories"),
  accountsEdit: (uid: string, id: string) => doc(db, "users", uid, "accounts", id),
  categoriesEdit: (uid: string, id: string) => doc(db, "users", uid, "categories", id),
}