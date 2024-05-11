export type UseFormFieldsKeys =
  'email' |
  'password' |
  'account-name' |
  'account-amount' |
  'account-color' |
  'account-currency' |
  'category-name' |
  'category-color' |
  'category-icon' |
  "category-type" |
  "category-currency" |
  'transaction-description' |
  'transaction-category-id' |
  'transaction-account-id' |
  'transaction-to-account-id' |
  'transaction-amount' |
  'transaction-date' |
  'transaction-type' |
  'is-create-transaction-after-change-account' |
  'transaction-to-amount'

export type UseFormFields = {
  [keyof in UseFormFieldsKeys]?: unknown
}

export type UseFormOptions<Fields extends UseFormFields> = {
  updateOnChange?: UseFormOptionsUpdateOnChange<Fields>,
  notValidateFields?: (keyof Fields)[]
  beforeSubmit?: UseFormOptionsBeforeSubmit<Fields>
}

export type UseFormOptionsUpdateOnChange<Fields extends UseFormFields> = (e: React.ChangeEvent<HTMLFormElement & FormFields<Fields>>, values: { [K in keyof Fields]: Fields[K] }) => void

export type UseFormOptionsBeforeSubmit<Fields extends UseFormFields> = (arg: {
  values: { [K in keyof Fields]: Fields[K] };
}) => {
  notValidateFields: (keyof Fields)[]
}

export type UseFormErrors<Fields extends UseFormFields> = {
  [K in keyof Fields]?: string
}

export type UseFormValues<Fields extends UseFormFields> = {
  [K in keyof Fields]?: string
}

export type UseFormValidator = (value: string, formNode: HTMLFormElement & FormFields<UseFormFields>) => undefined | { error: string }

export type UseFormValidators<Fields extends UseFormFields> = {
  [K in keyof Fields]?: UseFormValidator[]
}

export type FormFields<Fields extends UseFormFields> = {
  [K in keyof Fields]: HTMLInputElement
}