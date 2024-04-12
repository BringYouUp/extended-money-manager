import { RootState } from "@store";

export const ACCOUNT_SELECTOR = {
  visibleAccountsSelector: (state: RootState) => state.accounts.accounts.filter(account => !account.deleted)
}

export const CATEGORY_SELECTOR = {
  visibleCategoriesSelector: (state: RootState) => state.categories.categories.filter(category => !category.deleted)
}