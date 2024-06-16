declare namespace Shared {
  namespace Currencies {
    type CurrencyDefinition = {
      '$': 'USD',
      '€': 'EUR',
      '₽': 'RUB',
      'zł': 'PLN'
    }

    type CurrencyDefinitionReversed = {
      [K in keyof CurrencyDefinition as CurrencyDefinition[K] extends string ? CurrencyDefinition[K] : never]: K
    }

    type CurrencySymbols = keyof CurrencyDefinition
    type CurrencyCodes = keyof CurrencyDefinitionReversed

    type Currencies = {
      [K in CurrencyCodes]: number
    } & {
      updatedAt: string
    }

    type CurrenciesData = {
      data: Currencies
    }
  }
  namespace Firebase {
    type GotDoc = {
      profile: Store.User,
      accounts: {
        [is: string]: Store.Account[]
      },
      categories: {
        [is: string]: Store.Category[]
      }
    }
  }
}