import { CurrenciesEnum, StoreAccountsAccountCurrencies } from "@models";

export const PLATFORM_CURRENCIES_CODE_MAP: {
  [keyof in StoreAccountsAccountCurrencies]: keyof typeof CurrenciesEnum
} = {
  '$': CurrenciesEnum.USD,
  '€': CurrenciesEnum.EUR,
  '₽': CurrenciesEnum.RUB,
  'zł': CurrenciesEnum.PLN
}