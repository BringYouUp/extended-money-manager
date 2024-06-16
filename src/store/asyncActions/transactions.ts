import { generateTransactionsQuery, getRef, getStoreErrorFormat } from '@utils';
import { addDoc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountsEditAccount } from '@async-actions';

export const transactionsGetFilteredTransactions = createAsyncThunk<Store.Transaction[], { uid: string, filter: Hooks.UseFilterTransactions.FilterModel }>(
  'transactions/transactionsGetFilteredTransactions',
  ({ uid, filter }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.transactions(uid)

      const generatedQuery = generateTransactionsQuery(filter)
      console.log(`→ generatedQuery`, generatedQuery);

      getDocs(query(docRef, ...generatedQuery))
        .then(docSnap => {
          if (docSnap.size) {
            const data: Store.Transaction[] = []
            docSnap.forEach(doc => {
              data.push({
                ...doc.data() as Store.Transaction,
                id: doc.id,
              })
            })
            resolve(fulfillWithValue(data))
          } else {
            resolve(fulfillWithValue([]))
          }
        })
        .catch(err => reject(rejectWithValue(getStoreErrorFormat(err))))
    })
  }
)

export const transactionsSetTransactions = createAsyncThunk<Store.Transaction[], string>(
  'transactions/transactionsSetTransactions',
  (uid, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.transactions(uid)

      getDocs(query(docRef))
        .then(docSnap => {
          if (docSnap.size) {
            const data: Store.Transaction[] = []
            docSnap.forEach(doc => {
              data.push({
                ...doc.data() as Store.Transaction,
                id: doc.id
              })
            })
            resolve(fulfillWithValue(data))
          } else {
            resolve(fulfillWithValue([]))
          }
        })
        .catch(err => reject(rejectWithValue(getStoreErrorFormat(err))))
    })
  }
)

export const transactionsAddTransaction = createAsyncThunk<Store.Transaction, { transaction: Omit<Store.Transaction, Store.OmittedDateFields>, uid: string, withoutModyfingAccount?: boolean }>(
  'transactions/transactionsAddTransaction',
  ({ transaction, uid, withoutModyfingAccount }, { rejectWithValue, fulfillWithValue, dispatch }) => {
    return new Promise((resolve, reject) => {
      const docTransactionsRef = getRef.transactions(uid)
      const docAccountRef = getRef.account(uid, transaction.accountId)
      let accountData: Store.Account
      let toAccountData: Store.Account

      getDoc(docAccountRef).then(snap => {
        accountData = snap.data() as Store.Account

        switch (transaction.type) {
          case 'transfer': {
            accountData.amount -= transaction.amount
            const docToAccountRef = getRef.account(uid, transaction.toAccountId)

            return getDoc(docToAccountRef)
          }
          case 'withdraw': {
            accountData.amount -= (transaction.toAmount || transaction.amount)
            return
          }
          case 'income': {
            if (!withoutModyfingAccount) {
              accountData.amount += (transaction.toAmount || transaction.amount)
            }
            return
          }
        }
      })
        .then(snap => {
          if (!withoutModyfingAccount) {
            dispatch(accountsEditAccount({
              account: {
                ...accountData,
                id: transaction.accountId
              },
              uid
            }))
          }
          if (snap) {
            toAccountData = snap.data() as Store.Account
            toAccountData.amount += transaction.toAmount || transaction.amount

            dispatch(accountsEditAccount({
              account: {
                ...toAccountData,
                id: transaction.toAccountId
              },
              uid
            }))
          }
          return addDoc(docTransactionsRef, transaction)
        })
        .then(data => {
          resolve(fulfillWithValue({
            ...transaction,
            id: data.id,
          } as Store.Transaction))
        })
        .catch(err => reject(rejectWithValue(getStoreErrorFormat(err))))
    })
  }
)

export const transactionsEditTransaction = createAsyncThunk<Partial<Store.Transaction> & Pick<Store.Transaction, "id" | "accountId" | "amount" | "toAccountId">, { transaction: Partial<Store.Transaction> & Pick<Store.Transaction, "id" | "accountId" | "amount" | "toAccountId">, uid: string }>(
  'transactions/transactionsEditTransaction',
  ({ transaction, uid }, { rejectWithValue, fulfillWithValue, dispatch }) => {
    return new Promise((resolve, reject) => {
      const transactionRef = getRef.transactionsEdit(uid, transaction.id)
      const docAccountRef = getRef.account(uid, transaction.accountId)
      let transactionData: Store.Transaction
      let accountData: Store.Account
      let toAccountData: Store.Account

      getDoc(transactionRef).then(snap => {
        transactionData = snap.data() as Store.Transaction
        return getDoc(docAccountRef)
      })
        .then(snap => {
          accountData = snap.data() as Store.Account

          switch (transaction.type) {
            case 'transfer': {
              if (transaction.deleted) {
                accountData.amount += transactionData.amount
              } else {
                accountData.amount -= transaction.amount - transactionData.amount
              }
              const docToAccountRef = getRef.account(uid, transaction.toAccountId)
              return getDoc(docToAccountRef)
            }
            case 'withdraw': {
              if (transaction.deleted) {
                accountData.amount += (transactionData.toAmount || transactionData.amount)
              } else {
                accountData.amount -= (transaction.toAmount || transaction.amount) - (transactionData.toAmount || transactionData.amount)
              }
              return
            }
            case 'income': {
              if (transaction.deleted) {
                accountData.amount -= (transactionData.toAmount || transactionData.amount)
              } else {
                accountData.amount += (transaction.toAmount || transaction.amount) - (transactionData.toAmount || transactionData.amount)
              }
              return
            }
            default:
              return
          }
        })
        .then(snap => {
          dispatch(accountsEditAccount({
            account: {
              ...accountData,
              id: transaction.accountId
            },
            uid
          }))
          if (snap) {
            toAccountData = snap.data() as Store.Account

            if (transaction.deleted) {
              toAccountData.amount -= transactionData.toAmount || transactionData.amount
            } else {
              toAccountData.amount += ((transaction.toAmount || transaction.amount) - (transactionData.toAmount || transactionData.amount))
            }

            dispatch(accountsEditAccount({
              account: {
                ...toAccountData,
                id: transaction.toAccountId
              },
              uid
            }))
          }
          return setDoc(transactionRef, transaction, { merge: true })
        })
        .then(() => resolve(fulfillWithValue(transaction)))
        .catch(err => reject(rejectWithValue(getStoreErrorFormat(err))))
    })
  }
)