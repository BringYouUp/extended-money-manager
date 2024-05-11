import { User } from "firebase/auth";

import { StoreUserUser } from "@models";

export const getStoreUserFormat = (user: User): StoreUserUser => {
  return {
    uid: user.uid,
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
    displayName: user.displayName || '',
    emailVerified: user.emailVerified || false,
    photoURL: user.photoURL || ''
  }
}
