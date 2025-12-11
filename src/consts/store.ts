export const PLATFORM_CURRENCIES_CODE_MAP: Shared.Currencies.CurrencyDefinition =
	{
		$: "USD",
		"€": "EUR",
		"₽": "RUB",
		zł: "PLN",
	};

export const PLATFORM_CURRENCIES_LIST: {
	name: Shared.Currencies.CurrencySymbols;
	value: Shared.Currencies.CurrencySymbols;
}[] = [
	{ name: "$", value: "$" },
	{ name: "€", value: "€" },
	{ name: "₽", value: "₽" },
	{ name: "zł", value: "zł" },
];
