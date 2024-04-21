import { StoreError } from "@models";

export type StoreAccountsAccountCurrencies = '$' | '€' | '₽' | 'zł'

export type StoreAccountsAccount = {
  name: string;
  color: string;
  type: 'regular',
  amount: number,
  currency: StoreAccountsAccountCurrencies,
  id: string,
  createdAt: string,
  updatedAt: string,
  deleted: boolean,
}

export type StoreAccountsAccounts = StoreAccountsAccount[]

export type StoreAccounts = {
  accounts: StoreAccountsAccounts,
  error: StoreError,
  status: null | string
}