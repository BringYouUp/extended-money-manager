import { StoreAccounts, StoreAccountsAccount, StoreAccountsAccounts, StoreAccountsError } from '@models'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: StoreAccounts = {
  accounts: [],
  error: {
    code: '',
    message: ''
  },
}

const accounts = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, { payload }: PayloadAction<StoreAccountsAccounts>) => {
      state.accounts = payload || []
      state.error = initialState.error
    },
    editAccount: (state, { payload }: PayloadAction<Partial<StoreAccountsAccount> & Pick<StoreAccountsAccount, 'id'>>) => {
      const index = state.accounts.findIndex(account => account.id === payload.id);

      state.accounts[index] = {
        ...state.accounts[index],
        ...payload
      }
    },
    addAccount: (state, { payload }: PayloadAction<StoreAccountsAccount>) => {
      state.accounts.push(payload)
      state.error = initialState.error
    },
    clearAccounts: (state) => {
      state.accounts = initialState.accounts
    },
    setError: (state, { payload }: PayloadAction<StoreAccountsError>) => {
      state.error = payload
    },
    clearError: (state) => {
      state.error = initialState.error
    }
  }
})


export const {
  setAccounts,
  addAccount,
  editAccount,
  clearAccounts,
  setError,
  clearError,
} = accounts.actions;

export default accounts.reducer;
