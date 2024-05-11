/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { StoreAccountsAccount, StoreCategoriesCategory, StoreTransactionsTransaction } from "@models";
import { Action, Middleware, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { toSerializeActualFirestoreFormatDate } from "@utils";

export const serializeCreatedAtUpdatedAt: Middleware<unknown, unknown, Dispatch<UnknownAction>> = () => {
  return (next) => {
    return (action: Action) => {
      switch (action.type) {
        case 'accounts/accountsSetAccounts/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<StoreAccountsAccount>)
          break
        case 'categories/categoriesSetCategories/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<StoreCategoriesCategory>)
          break
        case 'transactions/transactionsSetTransactions/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<StoreTransactionsTransaction>)
          break
        case 'accounts/accountsAddAccount/fulfilled':
        case 'accounts/accountsEditAccount/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<StoreAccountsAccount>
          break
        case 'categories/categoriesAddCategory/fulfilled':
        case 'categories/categoriesEditCategory/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<StoreCategoriesCategory>
          break
        case 'transactions/transactionsAddTransaction/fulfilled':
        case 'transactions/transactionsEditTransaction/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<StoreTransactionsTransaction>
          break
      }
      return (next(action))
    }
  };
};
