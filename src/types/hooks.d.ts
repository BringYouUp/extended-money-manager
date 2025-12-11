declare namespace Hooks {
	namespace UseForm {
		type FieldsKeys =
			| "email"
			| "password"
			| "new-password"
			| "account-name"
			| "account-amount"
			| "account-color"
			| "account-currency"
			| "category-name"
			| "category-color"
			| "category-icon"
			| "category-type"
			| "category-currency"
			| "transaction-description"
			| "transaction-category-id"
			| "transaction-account-id"
			| "transaction-to-account-id"
			| "transaction-amount"
			| "transaction-date"
			| "transaction-type"
			| "is-create-transaction-after-change-account"
			| "transaction-to-amount"
			| "filter-mode"
			| "AND"
			| "OR";

		type UseFormFields = {
			[keyof in FieldsKeys]?: unknown;
		};

		type Options<Fields extends UseFormFields> = {
			updateOnChange?: OptionsUpdateOnChange<Fields>;
			notValidateFields?: (keyof Fields)[];
			beforeSubmit?: OptionsBeforeSubmit<Fields>;
		};

		type OptionsUpdateOnChange<Fields extends UseFormFields> = (
			e: React.ChangeEvent<HTMLFormElement & FormFields<Fields>>,
			values: { [K in keyof Fields]: Fields[K] },
		) => void;

		type OptionsBeforeSubmit<Fields extends UseFormFields> = (arg: {
			values: { [K in keyof Fields]: Fields[K] };
		}) => {
			notValidateFields: (keyof Fields)[];
		};

		type Errors<Fields extends UseFormFields> = {
			[K in keyof Fields]?: string;
		};

		type Validator = (
			value: string,
			formNode: HTMLFormElement & FormFields<UseFormFields>,
		) => undefined | { error: string };

		type Validators<Fields extends UseFormFields> = {
			[K in keyof Fields]?: Validator[];
		};

		type FormFields<Fields extends UseFormFields> = {
			[K in keyof Fields]: HTMLInputElement;
		};
	}

	namespace UseFilterTransactions {
		type FilterModel = {
			"transaction-types": Store.TransactionType[];
			accounts: string[];
			categories: string[];
			mode: "AND" | "OR";
		};

		type UpdateFilter = (key: keyof FilterModel, item?: string) => void;
	}
}
