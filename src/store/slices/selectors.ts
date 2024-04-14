import { RootState } from "@store";

export const ACCOUNT_SELECTOR = {
  allAccountsSelector: (state: RootState) => state.accounts.accounts,
  visibleAccountsSelector: (state: RootState) => state.accounts.accounts.filter(account => !account.deleted)
}

export const CATEGORY_SELECTOR = {
  visibleCategoriesSelector: (state: RootState) => state.categories.categories.filter(category => !category.deleted)
}

export const TRANSACTION_SELECTOR = {
  visibleCategoriesSelector: (state: RootState) => state.transactions.transactions.filter(transaction => !transaction.deleted)
}