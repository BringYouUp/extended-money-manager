import { FormFields, StoreAccountsAccountCurrencies, StoreCategoriesCategoryTypes, StoreTransactionsTransactionType, UseFormFields, UseFormValidator } from "@models"
import { PLATFORM_CURRENCIES_LIST } from "src/consts/store"

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
    !(+value) ||
    !/^[0-9]\d*?((\.|,)([1-9]\d?|\d[0-9]?))?$/.test(value)   // 1.23 || 1,23 || 1,03
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
  const acceptedValues: StoreAccountsAccountCurrencies[] = PLATFORM_CURRENCIES_LIST.map(item => item.value)
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

export const transactionCategoryId: UseFormValidator = (value: string = "", formNode: HTMLFormElement & FormFields<UseFormFields>) => {
  if (formNode?.['is-create-transaction-after-change-account']) {
    if (formNode['is-create-transaction-after-change-account'].checked) {
      return required(value, formNode)
    }
  } else {
    return required(value, formNode)
  }
}

export const getValidatorsForField = (field: keyof UseFormFields): UseFormValidator[] => {
  switch (field) {
    case 'email': return [required, noOnlyWhitespace, email]
    case 'password': return [required, noOnlyWhitespace, minLength(6), maxLength(40)]
    case 'account-name':
    case 'category-name':
      return [required, noOnlyWhitespace, minLength(3), maxLength(30)]
    case 'transaction-description':
      return [maxLength(50)]
    case 'account-amount':
    case 'transaction-amount':
    case 'transaction-to-amount':
      return [required, noOnlyWhitespace, accountAmount]
    case 'transaction-category-id':
      return [transactionCategoryId]
    case 'account-color':
    case 'category-color':
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
    case 'is-create-transaction-after-change-account':
      return []
    case 'filter-mode':
    case 'AND':
    case 'OR':
      return []
    default:
      console.error('THERE is NOT SUCH a FIELD')
      return []
  }
}