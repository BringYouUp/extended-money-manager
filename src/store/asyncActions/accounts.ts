import { ACCOUNTS_SLICE } from '@slices';
import { getRef, getStoreUserErrorFormat } from '@utils';
import { AppDispatch } from '@store';
import { addDoc, getDocs, setDoc } from 'firebase/firestore';
import { StoreAccountsAccount, StoreAccountsAccounts } from '@models';

export const accountsSetAccounts = (uid: string) => (dispatch: AppDispatch) => {
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
          dispatch(ACCOUNTS_SLICE.setAccounts(data))
          resolve(data)
        } else {
          dispatch(ACCOUNTS_SLICE.setAccounts([]))
          resolve([])
        }
      })
      .catch(reject)
  })
}

export const accountsAddAccount = (account: Omit<StoreAccountsAccount, 'id' | 'createdAt'>, uid: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const docRef = getRef.accounts(uid)
    const editedAccount: Omit<StoreAccountsAccount, 'id'> = {
      ...account,
      createdAt: new Date().toISOString()
    }

    addDoc(docRef, editedAccount)
      .then(data => {
        dispatch(ACCOUNTS_SLICE.addAccount({
          ...editedAccount,
          id: data.id,
        }))
        resolve(account)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(ACCOUNTS_SLICE.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}

export const accountsEditAccount = (account: Partial<StoreAccountsAccount> & Pick<StoreAccountsAccount, 'id'>, uid: string) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const docRef = getRef.accountsEdit(uid, account.id)

    console.log(`→ account`, account);
    setDoc(docRef, account, { merge: true })
      .then(() => {
        dispatch(ACCOUNTS_SLICE.editAccount(account))
        resolve(account)
      })
      .catch(err => {
        console.log(`→ error`, err);
        dispatch(ACCOUNTS_SLICE.setError(getStoreUserErrorFormat(err)))
        reject(err)
      })
  })
}
