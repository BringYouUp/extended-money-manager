import { getValidatorsForField } from "@utils";
import { FormEvent, useEffect, useRef, useState } from "react";

export const useForm = <Fields extends Hooks.UseForm.UseFormFields>(
  fields: Fields,
  options?: Hooks.UseForm.Options<Fields>
) => {
  const [errors, setErrors] = useState<Hooks.UseForm.Errors<Fields>>({});
  const validatorsRef = useRef<Hooks.UseForm.Validators<Fields>>({});
  const formRef = useRef<HTMLFormElement & Hooks.UseForm.FormFields<Fields>>(
    null
  );

  const getValue = (field: keyof Fields) => {
    if (!formRef.current) {
      return fields[field];
    }
    if (!(field in formRef.current.elements)) {
      console.error("There is not such a registered input !!!", field);
      return "";
    }

    if (formRef.current?.[field][0]) {
      return formRef.current[field].value;
    } else {
      switch (formRef.current?.[field]?.type) {
        case "checkbox":
        case "radio":
          return formRef.current?.[field]?.checked;
        default: {
          return formRef.current?.[field]?.value;
        }
      }
    }
  };

  const getValues = (): { [K in keyof Fields]: Fields[K] } => {
    return Object.keys(fields).reduce((acc, field) => {
      return {
        ...acc,
        [field]: getValue(field as keyof Fields),
      };
    }, {} as { [K in keyof Fields]: Fields[K] });
  };

  const setValue = (field: keyof Fields, value: string | boolean | number) => {
    const handler = (e: unknown) =>
      onChangeForm(
        e as React.ChangeEvent<
          HTMLFormElement & Hooks.UseForm.FormFields<Fields>
        >
      );
    let ref: Element;
    if (formRef.current) {
      if (!(field in formRef.current.elements)) {
        console.error("There is not such a registered input !!!", field);
        return;
      }

      if (formRef.current?.[field][0]) {
        formRef.current[field].value = value;
        ref = formRef.current.elements[value as number];
      } else {
        switch (formRef.current?.[field]?.type) {
          case "checkbox":
            formRef.current[field].checked = value;
            break;
          case "radio":
            debugger;
            break;
          default: {
            formRef.current[field].value = value;
            break;
          }
        }
        ref = formRef.current[field];
      }
      if (ref) {
        ref.addEventListener("change", handler);
        ref.dispatchEvent(new Event("change"));
        ref.removeEventListener("change", handler);
      } else {
        debugger;
      }
    } else {
      console.error("SET VALUE, Form is not mounted yet !!!", field);
    }
  };

  const onChangeForm = (
    e: React.ChangeEvent<HTMLFormElement & Hooks.UseForm.FormFields<Fields>>
  ) => {
    if (typeof options?.updateOnChange === "function") {
      options?.updateOnChange(e, getValues());
    }

    if (Object.keys(errors).length) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: null,
      }));
    }
  };

  const onValidate = (e: React.ChangeEvent<HTMLFormElement>): boolean => {
    let beforeSubmitData:
      | ReturnType<Hooks.UseForm.OptionsBeforeSubmit<Fields>>
      | undefined;

    if (typeof options?.beforeSubmit === "function") {
      beforeSubmitData = options?.beforeSubmit({
        values: getValues(),
      });
    }

    const notValidateFields =
      beforeSubmitData?.notValidateFields || options?.notValidateFields || [];

    const keys = Object.keys(e.target.elements).filter(
      (key) =>
        !/\d+/.test(key) &&
        //@ts-ignore
        e.target.elements?.[key].type !== "radio" &&
        !notValidateFields.includes(key as keyof Fields)
    ) as (keyof Fields)[];

    if (
      keys.length + (notValidateFields?.length || 0) !==
      Object.keys(fields).length
    ) {
      console.error("Every field must be registered !!!");
      debugger;
      return false;
    }

    let isWithoutError = true;

    for (const key of keys) {
      const value = getValue(key);
      const validators = validatorsRef.current?.[key];

      if (validators) {
        breakPoint: for (const validator of validators) {
          const mayBeError = validator(
            value,
            formRef.current as HTMLFormElement
          );
          if (mayBeError) {
            isWithoutError = false;
            setErrors((prev) => ({
              ...prev,
              [key]: mayBeError.error,
            }));
            console.error(`→ KEY`, key, mayBeError);
            break breakPoint;
          }
        }
      }
    }

    return isWithoutError;
  };

  const onSubmitForm =
    (onSuccess?: unknown, onFail?: unknown) =>
    (e: FormEvent<HTMLFormElement> & Hooks.UseForm.FormFields<Fields>) => {
      e.preventDefault();
      if (!onValidate(e as React.ChangeEvent<HTMLFormElement>)) {
        typeof onFail === "function" && onFail(e);
        return;
      }

      typeof onSuccess === "function" && onSuccess(e);
    };

  useEffect(() => {
    (Object.keys(fields) as (keyof Fields)[]).forEach((field) => {
      validatorsRef.current[field] = getValidatorsForField(
        field as keyof Hooks.UseForm.UseFormFields
      );
    });
  }, [fields]);

  useEffect(() => {
    if (formRef.current) {
      Object.keys(fields).forEach((key) => {
        if (formRef.current?.[key]) {
          setValue(
            key as keyof Fields,
            fields[key as keyof Fields] as string | boolean | number
          );
        } else {
          console.error("EFFECT. Every field must be registered !!!");
        }
      });
    }
  }, []);

  return {
    errors,
    formRef,
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    setValue,
  };
};
