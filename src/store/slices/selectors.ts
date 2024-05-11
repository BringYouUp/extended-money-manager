import { StoreAccounts, StoreCategories, StorePlatform, StoreTransactions } from "@models";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";

export const ACCOUNT_SELECTOR = {
  allAccountsSelector: createDraftSafeSelector(
    (state: RootState) => state.accounts,
    (state: StoreAccounts) => state.accounts,
  ),
  visibleAccountsSelector: createDraftSafeSelector(
    (state: RootState) => state.accounts,
    (state: StoreAccounts) => state.accounts.filter(account => !account.deleted),
  ),
}

export const CATEGORY_SELECTOR = {
  allCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: StoreCategories) => state.categories
  ),
  visibleCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.categories,
    (state: StoreCategories) => state.categories.filter(category => !category.deleted)
  )
}

export const TRANSACTION_SELECTOR = {
  visibleCategoriesSelector: createDraftSafeSelector(
    (state: RootState) => state.transactions,
    (state: StoreTransactions) => state.transactions.filter(transaction => !transaction.deleted)
  )
}

export const PLATFORM_SELECTOR = {
  currencies: createDraftSafeSelector(
    (state: RootState) => state.platform,
    (state: StorePlatform) => state.platform.currency
  )
}