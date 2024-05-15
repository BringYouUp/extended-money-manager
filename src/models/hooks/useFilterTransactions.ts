import { StoreTransactionsTransactionType } from "@models";

export type FilterModel = {
  "transaction-types": StoreTransactionsTransactionType[];
  accounts: string[];
  categories: string[];
  mode: 'AND' | 'OR'
};

export type UpdateFilter = (key: keyof FilterModel, item?: string) => void