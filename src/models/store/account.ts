export type StoreAccountsAccount = {
  name: string;
  color: string;
  type: 'regular',
  amount: string,
  currency: '$',
  id: string,
  createdAt: string
}

export type StoreAccountsAccounts = StoreAccountsAccount[]

export type StoreAccountsError = {
  message: string,
  code: string
}

export type StoreAccounts = {
  accounts: StoreAccountsAccounts,
  error: StoreAccountsError,
}