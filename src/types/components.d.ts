declare namespace Components {
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

		type ChangePassword = {
			password: string;
			"new-password": string;
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
			RightIcon?: ReactNode;
		}
	}
	namespace Button {
		interface Props extends React.HTMLAttributes<HTMLButtonElement> {
			disabled?: boolean;
			rounded?: boolean;
			centered?: boolean;
			active?: boolean;
			theme: "primary" | "outline" | "option" | "transparent";
			type?: "button" | "reset" | "submit" | undefined;
			_role?: "warning" | "success" | "error";
			width?: string;
			className?: string;
			style?: React.CSSProperties;
			children?: ReactNode;
		}
	}

	namespace AccountDrawer {
		type Edit = {
			mode: "edit";
			data: Store.Account;
		};

		type Create = {
			mode: "create";
			data?: never;
		};

		type Props = {
			is: boolean;
			onClose: () => void;
		} & (Edit | Create);
	}

	namespace CategoryDrawer {
		type Props = {
			is: boolean;
			onClose: () => void;
		} & (
			| {
					mode: "edit";
					data: Store.Category;
			  }
			| {
					mode: "create";
					data?: never;
			  }
		);
	}

	namespace TransactionDrawer {
		type Props = {
			is: boolean;
			onClose: () => void;
		} & (
			| {
					mode: "edit";
					data: Store.Transaction;
					initialValues?: never;
			  }
			| {
					mode: "create";
					data?: never;
					initialValues?: Partial<Store.Transaction>;
			  }
		);
	}
}
