import { User } from "firebase/auth";
import { StoreUserError, StoreUserUser } from "../../models";
import { FirebaseError } from "firebase/app";

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
    }
  }

  return {
    code: 'unknown',
    message: 'Something went wrong'
  }
}