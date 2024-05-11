import { CurrenciesEnum, StoreAccountsAccountCurrencies } from "@models";

export const PLATFORM_CURRENCIES_CODE_MAP: {
  [keyof in StoreAccountsAccountCurrencies]: keyof typeof CurrenciesEnum
} = {
  '$': CurrenciesEnum.USD,
  '€': CurrenciesEnum.EUR,
  '₽': CurrenciesEnum.RUB,
  'zł': CurrenciesEnum.PLN
}

export const PLATFORM_CURRENCIES_LIST: {
  name: StoreAccountsAccountCurrencies;
  value: StoreAccountsAccountCurrencies;
}[] = [
    { name: "$", value: "$" },
    { name: "€", value: "€" },
    { name: "₽", value: "₽" },
    { name: "zł", value: "zł" },
  ]