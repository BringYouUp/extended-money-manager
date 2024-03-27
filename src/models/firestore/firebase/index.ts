import { StoreAccountsAccounts, StoreCategoriesCategories, StoreUserUser } from "@models"

export type GotDoc = {
  profile: StoreUserUser,
  accounts: {
    [is: string]: StoreAccountsAccounts
  },
  categories: {
    [is: string]: StoreCategoriesCategories
  }
}