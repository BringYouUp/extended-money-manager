import { StoreError } from "@models"

export type StoreTransactionsTransactionType = 'transfer' | 'withdraw' | 'income'

export type StoreTransactionsTransaction = {
  description: string,
  accountId: string,
  amount: number,
  createdAt: string,
  updatedAt: string,
  type: StoreTransactionsTransactionType,
  id: string,
  date: string,
  deleted: boolean,
  categoryId: string,
  toAccountId: string,
  toAmount?: number
}

export type StoreTransactions = {
  transactions: StoreTransactionsTransaction[],
  error: StoreError,
  status: null | string
}