import { StoreAccountsAccountCurrencies } from "@models";

export type StoreCategoryIcon =
  "docs" |
  'desktop' |
  'attributes' |
  "clock" |
  "creditCard" |
  "gift" |
  "heart" |
  "private" |
  "star" |
  "subscribe" |
  "sync" |
  "user" |
  "palmtree" |
  "bank" |
  "cash" |
  "flask" |
  "glass" |
  "hammer" |
  "headphones" |
  "hearth" |
  "key" |
  "chip" |
  "movie" |
  "picture" |
  "pizza-slice" |
  "shopping-cart" |
  "skull" |
  "universe" |
  "video-camera" |
  "basketball" |
  "bookmark" |
  "bug" |
  "castle" |
  "cog" |
  "dice" |
  "gamepad" |
  "footbal" |
  "leaf" |
  "medal" |
  "mountain" |
  "music" |
  "shield"

export type StoreCategoriesCategoryTypes = "withdraw" | "income"

export type StoreCategoriesCategory = {
  name: string;
  color: string;
  icon: StoreCategoryIcon;
  currency: StoreAccountsAccountCurrencies;
  id: string,
  createdAt: string,
  updatedAt: string,
  type: StoreCategoriesCategoryTypes,
  deleted: boolean,
}

export type StoreCategoriesCategories = StoreCategoriesCategory[]

export type StoreCategoriesError = {
  message: string,
  code: string
}

export type StoreCategories = {
  categories: StoreCategoriesCategories,
  error: StoreCategoriesError,
  status: null | string
}