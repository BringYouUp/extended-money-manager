import {
  accountsAddAccount,
  accountsEditAccount,
  accountsSetAccounts,
} from "@async-actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Store.AccountSelector = {
  accounts: [],
  error: {
    code: "",
    message: "",
  },
  status: "accounts/accountsSetAccounts/pending",
};

const accounts = createSlice({
  name: "account",
  initialState,
  reducers: {
    clear: (state) => {
      state.accounts = initialState.accounts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        accountsSetAccounts.fulfilled,
        (state, { payload }: PayloadAction<Store.Account[]>) => {
          state.accounts = payload || [];
          state.error = initialState.error;
        },
      )
      .addCase(
        accountsAddAccount.fulfilled,
        (state, { payload }: PayloadAction<Store.Account>) => {
          state.accounts.push(payload);
          state.error = initialState.error;
        },
      )
      .addCase(
        accountsEditAccount.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<Partial<Store.Account> & Pick<Store.Account, "id">>,
        ) => {
          const index = state.accounts.findIndex(
            (account) => account.id === payload.id,
          );

          state.accounts[index] = {
            ...state.accounts[index],
            ...payload,
          };
        },
      )
      .addMatcher(
        ({ type }) => type.startsWith("accounts/") && type.endsWith("pending"),
        (state, { type }) => {
          state.error = initialState.error;
          state.status = type;
        },
      )
      .addMatcher(
        ({ type }) =>
          type.startsWith("accounts/") && type.endsWith("fulfilled"),
        (state) => {
          state.status = null;
        },
      )
      .addMatcher(
        ({ type }) => type.startsWith("accounts/") && type.endsWith("rejected"),
        (state, { payload }: PayloadAction<Store.Error>) => {
          state.error = payload;
        },
      );
  },
});

export const { clear } = accounts.actions;

export default accounts.reducer;
