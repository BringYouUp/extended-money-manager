/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Action, Middleware, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { toSerializeActualFirestoreFormatDate } from "@utils";

export const serializeCreatedAtUpdatedAt: Middleware<unknown, unknown, Dispatch<UnknownAction>> = () => {
  return (next) => {
    return (action: Action) => {
      switch (action.type) {
        case 'accounts/accountsSetAccounts/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<Store.Account>)
          break
        case 'categories/categoriesSetCategories/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<Store.Category>)
          break
        case 'transactions/transactionsSetTransactions/fulfilled':
          action.payload.forEach(toSerializeActualFirestoreFormatDate<Store.Transaction>)
          break
        case 'accounts/accountsAddAccount/fulfilled':
        case 'accounts/accountsEditAccount/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<Store.Account>
          break
        case 'categories/categoriesAddCategory/fulfilled':
        case 'categories/categoriesEditCategory/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<Store.Category>
          break
        case 'transactions/transactionsAddTransaction/fulfilled':
        case 'transactions/transactionsEditTransaction/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<Store.Transaction>
          break
        case 'platform/platformSetUpdatePlatformCurrency/fulfilled':
          toSerializeActualFirestoreFormatDate(action.payload)<Shared.Currencies.Currencies>
          break
      }
      return (next(action))
    }
  };
};
