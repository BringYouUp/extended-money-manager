
import { getRef, getStoreUserErrorFormat } from '@utils';
import { addDoc, getDocs, setDoc } from 'firebase/firestore';
import { StoreAccountsAccount, StoreAccountsAccounts } from '@models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const accountsSetAccounts = createAsyncThunk<StoreAccountsAccounts, string>(
  'accounts/accountsSetAccounts',
  (uid, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.accounts(uid)

      getDocs(docRef)
        .then(docSnap => {
          if (docSnap.size) {
            const data: StoreAccountsAccounts = []
            docSnap.forEach(doc => {
              data.push({
                ...doc.data() as StoreAccountsAccount,
                id: doc.id
              })
            })
            resolve(fulfillWithValue(data))
          } else {
            resolve(fulfillWithValue([]))
          }
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)

export const accountsAddAccount = createAsyncThunk<StoreAccountsAccount, { account: Omit<StoreAccountsAccount, 'id' | 'createdAt'>, uid: string }>(
  'accounts/accountsAddAccount',
  ({ account, uid }, { fulfillWithValue, rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.accounts(uid)
      const editedAccount: Omit<StoreAccountsAccount, 'id'> = {
        ...account,
        createdAt: new Date().toISOString()
      }

      addDoc(docRef, editedAccount)
        .then(data => {
          resolve(fulfillWithValue({
            ...editedAccount,
            id: data.id,
          }))
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)

export const accountsEditAccount = createAsyncThunk<Partial<StoreAccountsAccount> & Pick<StoreAccountsAccount, 'id'>, { account: Partial<StoreAccountsAccount> & Pick<StoreAccountsAccount, 'id'>, uid: string }>(
  'accounts/accountsEditAccount',
  ({ account, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.accountsEdit(uid, account.id)

      setDoc(docRef, account, { merge: true })
        .then(() => resolve(fulfillWithValue(account)))
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)
