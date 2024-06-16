import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";

export const ACCOUNT_SELECTOR = {
  allAccountsSelector: createDraftSafeSelector(
    (state: RootState) => state.accounts,
    (state: Store.AccountSelector) => state.accounts,
  ),
  visibleAccountsSelector: createDraftSafeSelector(
    (state: RootState) => state.accounts,
    (state: Store.AccountSelector) => state.accounts.filter(account => !account.deleted),
  ),
}

export const CATEGORY_SELECTOR = {
  allCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: Store.CategorySelector) => state.categories
  ),
  visibleCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: Store.CategorySelector) => state.categories.filter(category => !category.deleted)
  ),
  withdrawCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: Store.CategorySelector) => state.categories.filter(category => !category.deleted && category.type === 'withdraw')
  ),
  incomeCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: Store.CategorySelector) => state.categories.filter(category => !category.deleted && category.type === 'income')
  ),
}

export const TRANSACTION_SELECTOR = {
  visibleTransactionsSelector: createDraftSafeSelector(
    (state: RootState) => state.transactions,
    (state: Store.TransactionSelector) => state.transactions.filter(transaction => !transaction.deleted)
  )
}

export const PLATFORM_SELECTOR = {
  currencies: createDraftSafeSelector(
    (state: RootState) => state.platform,
    (state: Store.PlatformSelector) => state.platform.currency
  )
}