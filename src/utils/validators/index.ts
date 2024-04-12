import { StoreAccountsAccountCurrencies, StoreCategoriesCategoryTypes, StoreTransactionsTransactionType, UseFormFields, UseFormValidator } from "@models"

export const required: UseFormValidator = (value: string = "") => {
  if (!value) {
    return {
      error: 'Field is required'
    }
  }
}

export const noOnlyWhitespace: UseFormValidator = (value: string = "") => {
  if (/^\s+$/.test(value)) {
    return {
      error: 'Field cannot consist only of spaces'
    }
  }
}

export const email: UseFormValidator = (value: string = "") => {
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
    return {
      error: 'Please enter a valid email'
    }
  }
}

export const minLength = (minLength: number): UseFormValidator => (value: string = "") => {
  if (value.length < minLength) {
    return {
      error: `Min length is ${minLength} symbols`
    }
  }
}

export const maxLength = (maxLength: number): UseFormValidator => (value: string = "") => {
  if (value.length > maxLength) {
    return {
      error: `Max length is ${maxLength} symbols`
    }
  }
}

export const accountAmount = (value: string = "") => {
  if (
    !/^[1-9](\d+)?(\.([1-9]{1,2})|(\d[1-9]))?$/.test(value) &&    // 1.23 || 1,23 || 1,03
    !/^0\.\d[1-9]?$/.test(value)    // 0.23 || 0,01
  ) {
    return {
      error: `Please, enter valid number`
    }
  }
}

export const categoryIcon = (value: string = "") => {
  if (!value) {
    return {
      error: `Please, choose icon`
    }
  }
}

export const accountCurrency = (value: string) => {
  const acceptedValues: StoreAccountsAccountCurrencies[] = ['$', '€']
  if (!acceptedValues.includes(value as StoreAccountsAccountCurrencies)) {
    return {
      error: 'Please, choose currency'
    }
  }
}

export const categoryType = (value: string) => {
  const acceptedValues: StoreCategoriesCategoryTypes[] = ['withdraw', 'income']
  if (!acceptedValues.includes(value as StoreCategoriesCategoryTypes)) {
    return {
      error: 'Please, choose correct type'
    }
  }
}

export const transactionType = (value: string) => {
  const acceptedValues: StoreTransactionsTransactionType[] = ['income', 'transfer', 'withdraw']
  if (!acceptedValues.includes(value as StoreTransactionsTransactionType)) {
    return {
      error: 'Please, choose correct type'
    }
  }
}

export const getValidatorsForField = (field: keyof UseFormFields): UseFormValidator[] => {
  switch (field) {
    case 'email': return [required, noOnlyWhitespace, email]
    case 'password': return [required, noOnlyWhitespace, minLength(6), maxLength(40)]
    case 'account-name':
    case 'category-name':
    case 'transaction-description':
      return [required, noOnlyWhitespace, minLength(3), maxLength(30)]
    case 'account-amount':
    case 'transaction-amount':
      return [required, noOnlyWhitespace, accountAmount]
    case 'account-color':
    case 'category-color':
    case 'transaction-category-id':
    case 'transaction-account-id':
    case 'transaction-to-account-id':
    case 'transaction-date':
      return [required]
    case 'category-icon':
      return [categoryIcon]
    case 'account-currency':
    case 'category-currency':
      return [required, accountCurrency]
    case 'category-type':
      return [required, categoryType]
    case 'transaction-type':
      return [required, transactionType]
    default:
      console.error('THERE is NOT SUCH a FIELD')
      return []
  }
}