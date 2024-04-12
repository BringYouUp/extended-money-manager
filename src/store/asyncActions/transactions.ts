import { getRef, getStoreUserErrorFormat } from '@utils';
import { addDoc, getDocs, setDoc } from 'firebase/firestore';
import { StoreTransactionsTransaction, StoreTransactionsTransactions } from '@models';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const transactionsSetTransactions = createAsyncThunk<StoreTransactionsTransactions, string>(
  'transactions/transactionsSetTransactions',
  (uid, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.transactions(uid)

      getDocs(docRef)
        .then(docSnap => {
          if (docSnap.size) {
            const data: StoreTransactionsTransactions = []
            docSnap.forEach(doc => {
              data.push({
                ...doc.data() as StoreTransactionsTransaction,
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

export const transactionsAddTransaction = createAsyncThunk<StoreTransactionsTransaction, { transaction: Omit<StoreTransactionsTransaction, 'id' | 'createdAt'>, uid: string }>(
  'transactions/transactionsAddTransaction',
  ({ transaction, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.transactions(uid)
      const editedTransaction: Omit<StoreTransactionsTransaction, 'id'> = {
        ...transaction,
        createdAt: new Date().toISOString()
      }

      addDoc(docRef, editedTransaction)
        .then(data => {
          resolve(fulfillWithValue({
            ...editedTransaction,
            id: data.id,
          }))
        })
        .catch(err => reject(rejectWithValue(getStoreUserErrorFormat(err))))
    })
  }
)

export const transactionsEditTransaction = createAsyncThunk<Partial<StoreTransactionsTransaction> & Pick<StoreTransactionsTransaction, "id">, { transaction: Partial<StoreTransactionsTransaction> & Pick<StoreTransactionsTransaction, 'id'>, uid: string }>(
  'transactions/transactionsEditTransaction',
  ({ transaction, uid }, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.transactionsEdit(uid, transaction.id)

      setDoc(docRef, transaction, { merge: true })
        .then(() => resolve(fulfillWithValue(transaction)))
        .catch(err => reject(rejectWithValue(err)))
    })
  }
)