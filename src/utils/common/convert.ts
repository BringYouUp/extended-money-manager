import { Currencies, StoreAccountsAccountCurrencies } from "@models"
import { PLATFORM_CURRENCIES_CODE_MAP } from "src/consts/store";

export const getConvertedValue = ({
  from, to, value, currencies
}: {
  from: StoreAccountsAccountCurrencies | undefined,
  to: StoreAccountsAccountCurrencies | undefined,
  value: number | string,
  currencies: Currencies
}): string => {

  const fromConverted = currencies[PLATFORM_CURRENCIES_CODE_MAP[from as StoreAccountsAccountCurrencies]];
  const toConverted = currencies[PLATFORM_CURRENCIES_CODE_MAP[to as StoreAccountsAccountCurrencies]];

  const newValue = (((+value || 0) * toConverted) / fromConverted).toFixed(2);

  return newValue
}