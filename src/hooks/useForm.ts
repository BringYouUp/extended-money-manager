import { FormFields, UseFormErrors, UseFormFields, UseFormOptions, UseFormOptionsBeforeSubmit, UseFormValidators } from "@models";
import { getValidatorsForField } from "@utils";
import { FormEvent, useEffect, useRef, useState } from "react";

export const useForm = <Fields extends UseFormFields>(
  fields: Fields,
  options?: UseFormOptions<Fields>
) => {
  const [errors, setErrors] = useState<UseFormErrors<Fields>>({})
  const validatorsRef = useRef<UseFormValidators<Fields>>({})
  const formRef = useRef<HTMLFormElement & FormFields<Fields>>(null)

  const getValue = (field: keyof Fields) => {
    if (!formRef.current) {
      return fields[field]
    }
    if (!(field in formRef.current.elements)) {
      console.error('There is not such a registered input !!!', field)
      return ''
    }

    switch (formRef.current?.[field].type) {
      case 'checkbox':
        return formRef.current?.[field]?.checked
      default: {
        return formRef.current?.[field]?.value
      }
    }
  }

  const getValues = (): { [K in keyof Fields]: Fields[K] } => {
    return Object.keys(fields).reduce((acc, field) => {
      return {
        ...acc,
        [field]: getValue(field as keyof Fields)
      }
    }, {} as { [K in keyof Fields]: Fields[K] })
  }

  const setValue = (field: keyof Fields, value: string | boolean | number) => {
    if (formRef.current) {
      switch (formRef.current?.[field].type) {
        case 'checkbox':
          formRef.current[field].checked = value
          break
        default: {
          formRef.current[field].value = value
          break
        }
      }

      const handler = (e: unknown) => onChangeForm(e as React.ChangeEvent<HTMLFormElement & FormFields<Fields>>)

      formRef.current[field].addEventListener('change', handler)
      formRef.current[field].dispatchEvent(new Event('change'))
      formRef.current[field].removeEventListener('change', handler)
    } else {
      console.error('SET VALUE, Form is not mounted yet !!!', field)
    }
  }

  const onChangeForm = (e: React.ChangeEvent<HTMLFormElement & FormFields<Fields>>) => {
    if (typeof options?.updateOnChange === 'function') {
      options?.updateOnChange(e, getValues())
    }

    if (Object.keys(errors).length) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: null
      }))
    }
  };

  const onValidate = (e: React.ChangeEvent<HTMLFormElement>): boolean => {
    let beforeSubmitData: ReturnType<UseFormOptionsBeforeSubmit<Fields>> | undefined

    if (typeof options?.beforeSubmit === 'function') {
      beforeSubmitData = options?.beforeSubmit({
        values: getValues()
      })
    }

    const notValidateFields = beforeSubmitData?.notValidateFields || options?.notValidateFields || []

    const keys = Object.keys(e.target.elements).filter(key => !/\d+/.test(key) && !notValidateFields.includes(key as keyof Fields)) as (keyof Fields)[]

    if ((keys.length + (notValidateFields?.length || 0)) !== Object.keys(fields).length) {
      console.error('Every field must be registered !!!')
      return false
    }

    let isWithoutError = true

    for (const key of keys) {
      const value = getValue(key)
      const validators = validatorsRef.current?.[key]

      if (validators) {
        breakPoint: for (const validator of validators) {
          const mayBeError = validator(value, formRef.current as HTMLFormElement)
          if (mayBeError) {
            isWithoutError = false
            setErrors(prev => ({
              ...prev,
              [key]: mayBeError.error
            }))
            console.error(`→ KEY`, key, mayBeError);
            break breakPoint
          }
        }
      }
    }

    return isWithoutError
  }

  const onSubmitForm = (onSuccess?: unknown, onFail?: unknown) => (e: FormEvent<HTMLFormElement> & FormFields<Fields>) => {
    e.preventDefault()
    if (!onValidate(e as React.ChangeEvent<HTMLFormElement>)) {
      typeof onFail === 'function' && onFail(e)
      return
    }

    typeof onSuccess === 'function' && onSuccess(e)
  }

  useEffect(() => {
    (Object.keys(fields) as (keyof Fields)[]).forEach((field) => {
      validatorsRef.current[field] = getValidatorsForField(field as keyof UseFormFields)
    })
  }, [fields])

  useEffect(() => {
    if (formRef.current) {
      Object.keys(fields).forEach(key => {
        if (formRef.current?.[key]) {
          switch (formRef.current?.[key].type) {
            case 'checkbox':
              formRef.current[key].checked = fields?.[key as keyof Fields]
              break
            default: {
              formRef.current[key].value = fields?.[key as keyof Fields]
              break
            }
          }
          formRef?.current[key].dispatchEvent(new Event('change'))
        } else {
          console.error('EFFECT. Every field must be registered !!!')
        }
      })

      const handler = (e: unknown) => onChangeForm(e as React.ChangeEvent<HTMLFormElement & FormFields<Fields>>)

      formRef.current.addEventListener('change', handler)
      formRef.current.dispatchEvent(new Event('change'))
      formRef.current.removeEventListener('change', handler)
    }
  }, [])

  return {
    errors,
    formRef,
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    setValue,
  }
}
