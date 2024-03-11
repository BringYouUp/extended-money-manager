import { User } from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { StoreUserError, StoreUserUser } from "@models";

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

export const getStoreUserErrorFormat = (err: FirebaseError): StoreUserError => {
  if (err.name === "FirebaseError") {
    switch (err.code) {
      case 'auth/invalid-credential': return {
        code: err.code,
        message: 'Incorrect email or password'
      }
      case 'auth/missing-email': return {
        code: err.code,
        message: 'Please enter your email address'
      }
      case 'auth/too-many-requests': return {
        code: err.code,
        message: 'Please try later'
      }
      case 'auth/account-exists-with-different-credential': return {
        code: err.code,
        message: 'Account exists with different credential'
      }
    }
  }

  return {
    code: 'unknown',
    message: 'Something went wrong'
  }
}