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
}

export type StoreTransactionsTransactions = StoreTransactionsTransaction[]

export type StoreTransactionsError = {
  message: string,
  code: string
}

export type StoreTransactions = {
  transactions: StoreTransactionsTransactions,
  error: StoreTransactionsError,
  status: null | string
}