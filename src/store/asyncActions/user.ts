import { auth, googleProvider, githubProvider } from '../../../config/firebase'

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { USER_SLICES } from '../slices/slices';
import { AppDispatch } from '..';
import { getStoreUserErrorFormat, getStoreUserFormat } from '../../utils';

export const userSignUpWithEmailAndPassword = (email: string, password: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(USER_SLICES.clearError())

    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        console.log(`→ userSignUpWithEmailAndPassword data`, data);

        dispatch(USER_SLICES.setUser(getStoreUserFormat(data.user)))
        resolve(data)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const userSignInWithEmailAndPassword = (email: string, password: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(USER_SLICES.clearError())

    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        console.log(`→ signInWithEmailAndPassword data`, data);

        dispatch(USER_SLICES.setUser(getStoreUserFormat(data.user)))
        resolve(data)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const userLogOut = () => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(data => {
        dispatch(USER_SLICES.clearUser())
        resolve(data)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const userResetPassword = (email: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(data => {
        console.log(`→ sendPasswordResetEmail data`, data);
        dispatch(USER_SLICES.clearError())
        resolve(data)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const signInWithProvider = (provider: 'google' | 'github') => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const providers = {
      google: googleProvider,
      github: githubProvider
    }

    signInWithPopup(auth, providers[provider])
      .then(data => {
        console.log(`→ signInWithProvider data`, data);

        dispatch(USER_SLICES.setUser(getStoreUserFormat(data.user)))
        resolve(data)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

