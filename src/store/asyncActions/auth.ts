import { USER_SLICES } from '@slices';
import { auth, googleProvider, githubProvider } from '../../../config/firebase'

import { User, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getStoreUserErrorFormat } from '@utils';
import { AppDispatch } from '@store';

import { accountsSetAccounts, accountsSetUser, categoriesSetCategories } from '@async-actions';

export const userSignUpWithEmailAndPassword = (email: string, password: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    let authData: UserCredential

    dispatch(USER_SLICES.clearError())

    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        authData = data
        return dispatch(accountsSetAccounts(data.user.uid))
      })
      .then(() => dispatch(categoriesSetCategories(authData.user.uid)))
      .then(() => dispatch(accountsSetUser(authData.user.uid, authData.user)))
      .then(resolve)
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const userSignInWithEmailAndPassword = (email: string, password: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    let authData: UserCredential

    dispatch(USER_SLICES.clearError())

    signInWithEmailAndPassword(auth, email, password)
      .then(data => {
        authData = data
        return dispatch(accountsSetAccounts(data.user.uid))
      })
      .then(() => dispatch(categoriesSetCategories(authData.user.uid)))
      .then(() => dispatch(accountsSetUser(authData.user.uid, authData.user)))
      .then(resolve)
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

    let authData: UserCredential

    signInWithPopup(auth, providers[provider])
      .then(data => {
        authData = data
        return dispatch(accountsSetAccounts(data.user.uid))
      })
      .then(() => dispatch(categoriesSetCategories(authData.user.uid)))
      .then(() => dispatch(accountsSetUser(authData.user.uid, authData.user)))
      .then(resolve)
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const signInAutomatically = (data: User) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(accountsSetAccounts(data.uid))
      .then(() => dispatch(categoriesSetCategories(data.uid)))
      .then(() => dispatch(accountsSetUser(data.uid, data)))
      .then(resolve)
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(USER_SLICES.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}
