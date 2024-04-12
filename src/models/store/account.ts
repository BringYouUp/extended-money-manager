export type StoreAccountsAccountCurrencies = '$' | '€'

export type StoreAccountsAccount = {
  name: string;
  color: string;
  type: 'regular',
  amount: number,
  currency: StoreAccountsAccountCurrencies,
  id: string,
  createdAt: string,
  deleted: boolean,
}

export type StoreAccountsAccounts = StoreAccountsAccount[]

export type StoreAccountsError = {
  message: string,
  code: string
}

export type StoreAccounts = {
  accounts: StoreAccountsAccounts,
  error: StoreAccountsError,
  status: null | string
}