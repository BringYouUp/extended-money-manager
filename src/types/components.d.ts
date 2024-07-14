declare namespace Components {
  namespace Transitioned {
    type State = "default" | "enter" | "entered" | "exit";
  }
  namespace Form {
    type SignUpIn = {
      email: string;
      password: string;
    };
    type Account = {
      "account-name": string;
      "account-amount": number;
      "account-color": string;
      "account-currency": Shared.Currencies.CurrencySymbols | "";
      "is-create-transaction-after-change-account": "yes" | "no";
      "transaction-category-id": string;
    };
    type Category = {
      "category-name": string;
      "category-icon": Store.CategoryIcon | "";
      "category-color": string;
      "category-type": Store.CategoryType | "";
      "category-currency": Shared.Currencies.CurrencySymbols | "";
    };

    type Transaction = {
      "transaction-description": string;
      "transaction-category-id": string;
      "transaction-account-id": string;
      "transaction-amount": number;
      "transaction-date": string;
      "transaction-type": Store.TransactionType | "";
      "transaction-to-amount": number;
    };

    type TransactionTransfer = {
      "transaction-description": string;
      "transaction-account-id": string;
      "transaction-to-account-id": string;
      "transaction-amount": number;
      "transaction-date": string;
      "transaction-type": "transfer";
      "transaction-to-amount": number;
    };

    type TransactionProps =
      | {
          mode: "edit";
          data: Store.Transaction;
          initialValues?: unknown;
        }
      | {
          mode: "create";
          data?: unknown;
          initialValues?: Partial<Store.Transaction>;
        };

    type TransactionsFilter = {
      "filter-mode": "AND" | "OR";
      AND: string;
      OR: string;
    };
  }
  namespace Input {
    interface Props extends React.HTMLAttributes<HTMLInputElement> {
      id?: string;
      name: string;
      placeholder?: string;
      type?: string;
      error?: boolean;
      hidden?: boolean;
      defaultValue?: string;
      style?: React.CSSProperties;
      className?: string;
      children?: never;
    }
  }
}
