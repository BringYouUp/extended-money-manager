import { FormEvent, useEffect, useRef, useState } from "react";
import { UseFormErrors, UseFormFields, UseFormValidators } from "../models";
import { getValidatorsForField } from "../utils";

type isCorrect = boolean

const useFormValidation = <Fields extends UseFormFields>(fields: Fields[]) => {
  const [errors, setErrors] = useState<UseFormErrors<Fields>>({})
  const validatorsRef = useRef<UseFormValidators<Fields>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const onChangeForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (Object.keys(errors).length) {

      setErrors(prev => ({
        ...prev,
        [e.target.name]: null
      }))
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const getValue = (field: Fields) => formRef.current?.elements[field].value

  const getValues = () => {
    return fields.reduce((acc, field) => {
      return acc.concat(getValue(field))
    }, [])
  }

  const onValidate = (e: React.ChangeEvent<HTMLFormElement>): isCorrect => {
    const keys = Object.keys(e.target.elements).filter(key => !/\d+/.test(key)) as Fields[]

    let isWithoutError = true

    for (const key of keys) {
      const value = getValue(key)
      const validators = validatorsRef.current?.[key]

      if (validators) {
        zzz: for (const validator of validators) {
          const mayBeError = validator(value)
          if (mayBeError) {
            isWithoutError = false
            setErrors(prev => ({
              ...prev,
              [key]: mayBeError.error
            }))
            break zzz
          }
        }
      }
    }

    return isWithoutError
  }

  const onSubmitForm = (onSuccess?: unknown, onFail?: unknown) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!onValidate(e as React.ChangeEvent<HTMLFormElement>)) {
      typeof onFail === 'function' && onFail(e)
      return
    }

    typeof onSuccess === 'function' && onSuccess(e)
  }

  useEffect(() => {
    fields.forEach((field: Fields) => {
      validatorsRef.current[field] = getValidatorsForField(field)
    })
  }, [fields])

  return {
    errors,
    formRef,
    onChangeForm,
    onSubmitForm,
    getValues,
  }
}

export default useFormValidation
