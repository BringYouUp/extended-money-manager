import { getRef, getStoreUserFormat } from '@utils';
import { getDoc, setDoc } from 'firebase/firestore';
import { GotDoc, StoreUserUser } from '@models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider, githubProvider } from '../../../config/firebase'

import { User, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getStoreUserErrorFormat } from '@utils';

import { accountsSetAccounts, categoriesSetCategories, transactionsSetTransactions } from '@async-actions';

export const userSetUser = createAsyncThunk<StoreUserUser, { uid: string, user: User }>(
  'user/userSetUser',
  ({ uid, user }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.user(uid)

      const createProfileSnap = () => {
        const profile = getStoreUserFormat(user)
        return Promise.all<[unknown, StoreUserUser]>([
          setDoc(getRef.user(uid), { profile }, { merge: true }),
          profile
        ])
      }

      getDoc(docRef)
        .then(docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data() as GotDoc

            if (data.profile) {
              resolve(fulfillWithValue(data.profile))
              return
            } else {
              return createProfileSnap()
            }
          } else {
            return createProfileSnap()
          }
        })
        .then(data => {
          if (data?.[1]) {
            resolve(fulfillWithValue(data?.[1]))
          }
        })
        .catch(err => reject(rejectWithValue(err)))
    })
  }
)

export const userSignUpWithEmailAndPassword = createAsyncThunk<unknown, { email: string, password: string }>(
  'user/signUpWithEmailAndPassword',
  ({ email, password }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      let authData: UserCredential

      createUserWithEmailAndPassword(auth, email, password)
        .then(data => {
          authData = data
          dispatch(accountsSetAccounts(authData.user.uid))
          dispatch(categoriesSetCategories(authData.user.uid))
          dispatch(transactionsSetTransactions(authData.user.uid))
          resolve(fulfillWithValue(authData))
        })
        .catch(err => {
          console.log(`→ error`, err);
          reject(rejectWithValue(getStoreUserErrorFormat(err)))
        })
    })
  }
)

export const userSignInWithEmailAndPassword = createAsyncThunk<unknown, { email: string, password: string }>(
  'user/signInWithEmailAndPassword',
  ({ email, password }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      let authData: UserCredential

      signInWithEmailAndPassword(auth, email, password)
        .then(data => {
          authData = data
          dispatch(accountsSetAccounts(authData.user.uid))
          dispatch(categoriesSetCategories(authData.user.uid))
          dispatch(transactionsSetTransactions(authData.user.uid))
          resolve(fulfillWithValue(authData))
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)

export const userLogOut = createAsyncThunk<unknown, void>(
  'user/logOut',
  (_, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(data => resolve(fulfillWithValue(data)))
        .catch(err => {
          console.log(`→ error`, err);
          reject(rejectWithValue(getStoreUserErrorFormat(err)))
        })
    })
  }
)

export const signInWithProvider = createAsyncThunk<unknown, { provider: 'google' | 'github' }>(
  'users/signInWithProvider',
  ({ provider }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const providers = {
        google: googleProvider,
        github: githubProvider
      }

      let authData: UserCredential

      signInWithPopup(auth, providers[provider])
        .then(data => {
          authData = data
          dispatch(userSetUser({ uid: authData.user.uid, user: authData.user }))
        })
        .then(() => {
          dispatch(accountsSetAccounts(authData.user.uid))
          dispatch(categoriesSetCategories(authData.user.uid))
          dispatch(transactionsSetTransactions(authData.user.uid))
          resolve(fulfillWithValue(authData))
        })
        .catch(err => {
          console.log(`→ error`, err);
          reject(rejectWithValue(getStoreUserErrorFormat(err)))
        })
    })
  }
)

export const userResetPassword = createAsyncThunk<unknown, { email: string }>(
  'user/resetPassword',
  ({ email }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(data => {
          console.log(`→ sendPasswordResetEmail data`, data);
          resolve(fulfillWithValue(data))
        })
        .catch(err => {
          console.log(`→ error`, err);
          reject(rejectWithValue(getStoreUserErrorFormat(err)))
        })
    })
  }
)

export const signInAutomatically = createAsyncThunk<unknown, User>(
  'user/signInAutomatically',
  (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      dispatch(userSetUser({ uid: data.uid, user: data }))
        .then(() => {
          dispatch(accountsSetAccounts(data.uid))
          dispatch(categoriesSetCategories(data.uid))
          dispatch(transactionsSetTransactions(data.uid))
          resolve(fulfillWithValue(getStoreUserFormat(data)))
        })
        .catch(err => {
          console.log(`→ error`, err);
          reject(rejectWithValue(getStoreUserErrorFormat(err)))
        })
    })
  }
)