import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  EmailAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";

import { AppDispatch } from "@store";
import { getRef, getStoreErrorFormat, getStoreUserFormat } from "@utils/store";
import {
  accountsSetAccounts,
  categoriesSetCategories,
  platformSetPlatform,
  transactionsSetTransactions,
} from ".";
import { auth, githubProvider, googleProvider } from "../../../config/firebase";

export const userSetUser = createAsyncThunk<
  Store.User,
  { uid: string; user: User }
>(
  "user/userSetUser",
  ({ uid, user }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.user(uid);

      const createProfileSnap = () => {
        const profile = getStoreUserFormat(user);
        return Promise.all<[unknown, Store.User]>([
          setDoc(getRef.user(uid), { profile }, { merge: true }),
          profile,
        ]);
      };

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Shared.Firebase.GotDoc;

            if (data.profile) {
              resolve(fulfillWithValue(data.profile));
              return;
            } else {
              return createProfileSnap();
            }
          } else {
            return createProfileSnap();
          }
        })
        .then((data) => {
          if (data?.[1]) {
            resolve(fulfillWithValue(data?.[1]));
          }
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const userSignUpWithEmailAndPassword = createAsyncThunk<
  unknown,
  { email: string; password: string }
>(
  "user/signUpWithEmailAndPassword",
  ({ email, password }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      let authData: UserCredential;

      dispatch(platformSetPlatform(null))
        .then(() => createUserWithEmailAndPassword(auth, email, password))
        .then((data) => {
          authData = data;
          dispatch(accountsSetAccounts(authData.user.uid));
          dispatch(categoriesSetCategories(authData.user.uid));
          dispatch(transactionsSetTransactions(authData.user.uid));
          resolve(fulfillWithValue(authData));
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const userChangePassword =
  ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) =>
  (dispatch: AppDispatch) => {
    return new Promise((resolve, reject) => {
      console.log(`→ dispatch`, dispatch);

      const auth = getAuth();
      console.log(
        `→ auth.currentUser.providerData`,
        auth.currentUser?.providerData
      );

      let credential;

      switch (auth.currentUser?.providerData[0].providerId) {
        case "google.com":
          credential = EmailAuthProvider.credential(
            auth.currentUser!.email!,
            oldPassword
          );
          break;
        case "password":
          credential = EmailAuthProvider.credential(
            auth.currentUser!.email!,
            oldPassword
          );
          break;
      }

      console.log(`→ credential`, credential);

      reauthenticateWithCredential(auth.currentUser!, credential!)
        .then(() => updatePassword(auth.currentUser!, newPassword))
        .then(resolve)
        .catch(reject);
    });
  };

export const userSignInWithEmailAndPassword = createAsyncThunk<
  unknown,
  { email: string; password: string }
>(
  "user/signInWithEmailAndPassword",
  ({ email, password }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      let authData: UserCredential;

      dispatch(platformSetPlatform(null))
        .then(() => signInWithEmailAndPassword(auth, email, password))
        .then((data) => {
          authData = data;
          dispatch(accountsSetAccounts(authData.user.uid));
          dispatch(categoriesSetCategories(authData.user.uid));
          dispatch(transactionsSetTransactions(authData.user.uid));
          resolve(fulfillWithValue(authData));
        })
        .catch((err) => reject(rejectWithValue(err)));
      // .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const userLogOut = createAsyncThunk<unknown, void>(
  "user/logOut",
  (_, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then((data) => resolve(fulfillWithValue(data)))
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const signInWithProvider = createAsyncThunk<
  unknown,
  { provider: "google" | "github" }
>(
  "users/signInWithProvider",
  ({ provider }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const providers = {
        google: googleProvider,
        github: githubProvider,
      };

      let authData: UserCredential;

      debugger;

      dispatch(platformSetPlatform(null))
        .then(() => signInWithPopup(auth, providers[provider]))
        .then((data) => {
          debugger;
          authData = data;
          dispatch(
            userSetUser({ uid: authData.user.uid, user: authData.user })
          );
        })
        .then(() => {
          dispatch(accountsSetAccounts(authData.user.uid));
          dispatch(categoriesSetCategories(authData.user.uid));
          dispatch(transactionsSetTransactions(authData.user.uid));
          resolve(fulfillWithValue(authData));
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const userResetPassword = createAsyncThunk<unknown, { email: string }>(
  "user/resetPassword",
  ({ email }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then((data) => resolve(fulfillWithValue(data)))
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);

export const signInAutomatically = createAsyncThunk<unknown, User>(
  "user/signInAutomatically",
  (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      dispatch(platformSetPlatform(null))
        .then(() => dispatch(userSetUser({ uid: data.uid, user: data })))
        .then(() => {
          dispatch(accountsSetAccounts(data.uid));
          dispatch(categoriesSetCategories(data.uid));
          dispatch(transactionsSetTransactions(data.uid));
          resolve(fulfillWithValue(getStoreUserFormat(data)));
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);
