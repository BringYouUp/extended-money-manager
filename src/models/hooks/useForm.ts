export type UseFormFields = 'email' | 'password' | 'account-name' | 'account-amount' | 'account-color' | 'category-name' | 'category-color' | 'category-icon'

export type UseFormErrors<Fields extends UseFormFields> = {
  [keyof in Fields]?: string
}

export type UseFormValues<Fields extends UseFormFields> = {
  [keyof in Fields]?: string
}

export type UseFormValidator = (value: string) => undefined | { error: string }

export type UseFormValidators<Fields extends string> = {
  [keyof in Fields]?: UseFormValidator[]
}

export type UseFormOptions<Fields extends UseFormFields> = {
  updateOnChange?: {
    value: boolean,
    callback: (e: React.ChangeEvent<HTMLFormElement>, values: { [keyof in Fields]: string }) => void
  },
  defaultValues?: { [keyof in Fields]?: string }
}

