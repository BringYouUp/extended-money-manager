import { UseFormFields, UseFormValidator } from "@models"

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
    !/^[1-9](\d+)?((\.|,)(\d+)?[1-9])?$/.test(value) &&    // 1.2323 || 1,2334 || 1,00300
    !/^0(\.|,)(\d+)?[1-9]$/.test(value)    // 0.2323 || 0,0000000001
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

export const getValidatorsForField = (field: UseFormFields): UseFormValidator[] => {
  switch (field) {
    case 'email': return [required, noOnlyWhitespace, email]
    case 'password': return [required, noOnlyWhitespace, minLength(6), maxLength(40)]
    case 'account-name':
    case 'category-name':
      return [required, noOnlyWhitespace, minLength(3), maxLength(30)]
    case 'account-amount': return [required, noOnlyWhitespace, accountAmount]
    case 'account-color':
    case 'category-color':
      return [required]
    case 'category-icon':
      return [categoryIcon]
    default:
      console.error('THERE is NOT SUCH a FIELD')

      return []
  }
}