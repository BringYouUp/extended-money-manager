export type StoreTransactionsTransactionType = 'transfer' | 'withdraw' | 'income'

export type StoreTransactionsTransaction = {
  description: string,
  categoryId: string,
  accountId: string,
  toAccountId: string,
  amount: number,
  createdAt: string,
  id: string,
  type: StoreTransactionsTransactionType
  date: string,
  deleted: boolean,
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