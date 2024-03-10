export type UseFormFields = 'email' | 'password'

export type UseFormErrors<Fields extends string> = {
  [keyof in Fields]?: string
}

export type UseFormValidator = (value: string) => undefined | { error: string }

export type UseFormValidators<Fields extends string> = {
  [keyof in Fields]?: UseFormValidator[]
}
