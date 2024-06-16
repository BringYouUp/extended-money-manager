import { transactionsAddTransaction, transactionsEditTransaction, transactionsSetTransactions } from '@async-actions'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Store.TransactionSelector = {
  transactions: [],
  error: {
    code: '',
    message: ''
  },
  status: 'transactions/transactionsSetTransactions/pending'
}

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clear: (state) => {
      state.transactions = initialState.transactions
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionsSetTransactions.fulfilled, (state, { payload }: PayloadAction<Store.Transaction[]>) => {
        state.transactions = payload || []
        state.error = initialState.error
      })
      .addCase(transactionsAddTransaction.fulfilled, (state, { payload }: PayloadAction<Store.Transaction>) => {
        state.transactions.push(payload)
        state.error = initialState.error
      })
      .addCase(transactionsEditTransaction.fulfilled, ((state, { payload }: PayloadAction<Partial<Store.Transaction> & Pick<Store.Transaction, 'id'>>) => {
        const index = state.transactions.findIndex(transaction => transaction.id === payload.id);

        state.transactions[index] = {
          ...state.transactions[index],
          ...payload
        }
      }))
      .addMatcher(
        ({ type }) => type.startsWith('transactions/') && type.endsWith('pending'),
        (state, { type }) => {
          state.error = initialState.error
          state.status = type
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('transactions/') && type.endsWith('fulfilled'),
        (state) => {
          state.status = null
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith('transactions/') && type.endsWith('rejected'),
        (state, { payload }: PayloadAction<Store.Error>) => {
          state.error = payload
        }
      )
  }
})

export const { clear } = transactions.actions;

export default transactions.reducer;
