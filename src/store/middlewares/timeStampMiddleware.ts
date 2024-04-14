/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Action, Middleware, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { getActualFormatDate } from "@utils";

const dic = {
  "accounts/accountsEditAccount/pending": "account",
  "categories/categoriesEditCategory/pending": "category",
  "transactions/transactionsEditTransaction/pending": "transaction",
  "accounts/accountsAddAccount/pending": "account",
  "categories/categoriesAddCategory/pending": "category",
  "transactions/transactionsAddTransaction/pending": "transaction",
}

export const timeStampMiddleware: Middleware<unknown, unknown, Dispatch<UnknownAction>> = () => {
  return (next) => {
    return (action: Action) => {
      switch (action.type) {
        case 'accounts/accountsEditAccount/pending':
        case 'categories/categoriesEditCategory/pending':
          action.meta.arg[dic[action.type]].updatedAt = getActualFormatDate()
          break
        case 'accounts/accountsAddAccount/pending':
        case 'categories/categoriesAddCategory/pending':
        case 'transactions/transactionsAddTransaction/pending':
          action.meta.arg[dic[action.type]].createdAt = getActualFormatDate()
          action.meta.arg[dic[action.type]].updatedAt = getActualFormatDate()
          break
      }
      return (next(action))
    }
  };
};
