export enum CurrenciesEnum {
  EUR = 'EUR',
  PLN = 'PLN',
  RUB = 'RUB',
  USD = 'USD',
}

export type Currencies = {
  [K in keyof typeof CurrenciesEnum]: number
} & {
  updatedAt: string
}

export type CurrenciesData = {
  data: Currencies
}