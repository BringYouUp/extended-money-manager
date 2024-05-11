import { CurrenciesData } from "@models"

class Currency {
  url = `https://api.freecurrencyapi.com/v1/latest?apikey=${import.meta.env.VITE_CURRENCY_API_KEY}&currencies=EUR%2CUSD%2CPLN%2CRUB`
  constructor() { }

  get(): Promise<CurrenciesData> {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then(d => d.json())
        .then(resolve)
        .catch(reject)
    })
  }
}

export const currency = new Currency()