
declare namespace Store {
  type OmittedDateFields = "id" | "createdAt" | "updatedAt"

  type Error = {
    message: string,
    code: string
  }

  // User

  type User = {
    email: string;
    displayName: string;
    phoneNumber: string;
    uid: string;
    emailVerified: boolean;
    photoURL: string;
  }

  type UserSelector = {
    user: User,
    error: Error,
  }

  // Account

  type Account = {
    name: string;
    color: string;
    type: 'regular',
    amount: number,
    currency: Shared.Currencies.CurrencySymbols,
    id: string,
    createdAt: string,
    updatedAt: string,
    deleted: boolean,
  }

  type AccountSelector = {
    accounts: Store.Account[],
    error: Store.Error,
    status: null | string
  }

  // Category

  type CategoryIcon =
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

  type CategoryType = "withdraw" | "income"

  type Category = {
    name: string;
    color: string;
    icon: Store.CategoryIcon;
    currency: Shared.Currencies.CurrencySymbols;
    id: string,
    createdAt: string,
    updatedAt: string,
    type: Store.CategoryType,
    deleted: boolean,
  }

  type CategorySelector = {
    categories: Store.Category[],
    error: Store.Error,
    status: null | string
  }

  // Transaction

  type TransactionType = 'transfer' | 'withdraw' | 'income'

  type Transaction = {
    description: string,
    accountId: string,
    amount: number,
    createdAt: string,
    updatedAt: string,
    type: TransactionType,
    id: string,
    date: string,
    deleted: boolean,
    categoryId: string,
    toAccountId: string,
    toAmount?: numbe
  }

  type TransactionSelector = {
    transactions: Transaction[],
    error: Error,
    status: null | string
  }

  // Platform

  type Platform = {
    settings: {
      [key: string]: string,
    },
    currency: Shared.Currencies.Currencies
  }

  type PlatformSelector = {
    platform: Platform,
    error: StoreError,
    status: null | string
  }

  // Toast

  type ToastSelector = {
    toasts: Toast[]
  }
  type ToastType = "success" | "error" | "warning"

  type Toast = {
    type: ToastType,
    title: string,
    description?: string,
    id: string
  }
}
