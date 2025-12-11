import { PLATFORM_CURRENCIES_CODE_MAP } from "@consts/store";

export const getConvertedValue = ({
	from,
	to,
	value,
	currencies,
}: {
	from: Shared.Currencies.CurrencySymbols | undefined;
	to: Shared.Currencies.CurrencySymbols | undefined;
	value: number | string;
	currencies: Shared.Currencies.Currencies;
}): string => {
	const fromConverted =
		currencies[
			PLATFORM_CURRENCIES_CODE_MAP[from as Shared.Currencies.CurrencySymbols]
		];
	const toConverted =
		currencies[
			PLATFORM_CURRENCIES_CODE_MAP[to as Shared.Currencies.CurrencySymbols]
		];

	const newValue = (((+value || 0) * toConverted) / fromConverted).toFixed(2);

	return newValue;
};
