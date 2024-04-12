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
  'transaction-type'

export type UseFormFields = {
  [keyof in UseFormFieldsKeys]?: unknown
}

export type UseFormOptions<Fields extends UseFormFields> = {
  updateOnChange?: {
    value: boolean,
    callback: (e: React.ChangeEvent<HTMLFormElement>, values: { [K in keyof Fields]: Fields[K] }) => void
  },
}

export type UseFormErrors<Fields extends UseFormFields> = {
  [K in keyof Fields]?: string
}

export type UseFormValues<Fields extends UseFormFields> = {
  [K in keyof Fields]?: string
}

export type UseFormValidator = (value: string) => undefined | { error: string }

export type UseFormValidators<Fields extends UseFormFields> = {
  [K in keyof Fields]?: UseFormValidator[]
}

export type FormFields<Fields extends UseFormFields> = {
  [K in keyof Fields]: HTMLInputElement
}