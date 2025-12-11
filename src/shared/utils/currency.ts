export class Currency {
	url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.VITE_CURRENCY_API_KEY}&currencies=EUR%2CUSD%2CPLN%2CRUB`;
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
	constructor() {}

	get(): Promise<Shared.Currencies.CurrenciesData> {
		return new Promise((resolve, reject) => {
			fetch(this.url)
				.then((d) => d.json())
				.then(resolve)
				.catch(reject);
		});
	}
}

export const currency = new Currency();
