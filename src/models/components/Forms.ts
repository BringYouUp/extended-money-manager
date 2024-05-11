import { StoreAccountsAccountCurrencies, StoreCategoriesCategoryTypes, StoreCategoryIcon, StoreTransactionsTransaction, StoreTransactionsTransactionType } from "@models";

export type SignUpInFormFields = {
  "email": string,
  "password": string
}

export type AccountFormFormFields = {
  "account-name": string;
  "account-amount": number;
  "account-color": string;
  "account-currency": StoreAccountsAccountCurrencies | "";
  "is-create-transaction-after-change-account": boolean;
  "transaction-category-id": string;
}

export type CategoryFormFormFields = {
  "category-name": string;
  "category-icon": StoreCategoryIcon | "";
  "category-color": string;
  "category-type": StoreCategoriesCategoryTypes | "";
  "category-currency": StoreAccountsAccountCurrencies | "";
}

export type TransactionFormFormFields = {
  "transaction-description": string;
  "transaction-category-id": string;
  "transaction-account-id": string;
  "transaction-amount": number;
  "transaction-date": string;
  "transaction-type": StoreTransactionsTransactionType | "",
  "transaction-to-amount": number;
}

export type TransactionTransferFormFormFields = {
  "transaction-description": string;
  "transaction-account-id": string;
  "transaction-to-account-id": string;
  "transaction-amount": number;
  "transaction-date": string;
  "transaction-type": "transfer",
  "transaction-to-amount": number;
}

export type TransactionFormProps = {
  mode: "edit";
  data: StoreTransactionsTransaction;
  initialValues?: unknown;
}
  | {
    mode: "create";
    data?: unknown;
    initialValues?: Partial<StoreTransactionsTransaction>;
  }