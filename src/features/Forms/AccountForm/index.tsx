import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { useForm } from "@hooks/useForm";
import { useUID } from "@hooks/useUID";

import {
  accountsAddAccount,
  accountsEditAccount,
} from "@async-actions/accounts";
import { transactionsAddTransaction } from "@async-actions/transactions";
import { Category } from "@entities/Category";
import { useLoading } from "@hooks/useLoading";
import { useToast } from "@hooks/useToast";
import {
  Button,
  ColorPicker,
  Flex,
  Input,
  RadioGroup,
  Select,
  SelectOption,
  Spinner,
  Text,
} from "@ui";
import { getActualFirestoreFormatDate } from "@utils/store";
import { useMemo } from "react";

import { RADIO_GROUP_DATA } from "./consts";

import { PLATFORM_CURRENCIES_LIST } from "@consts/store";
import { Form } from "@entities/Form";
import { useStoreErrorObserver } from "@hooks/useStoreErrorObserver";
import { CATEGORY_SELECTOR } from "@selectors";

type Edit = {
  mode: "edit";
  initialValues: Store.Account;
};

type Create = {
  mode: "create";
  initialValues?: unknown;
};

type Props = {
  onClose: (...args: unknown[]) => void;
  setValues: (values: Components.Form.Account) => void;
} & (Create | Edit);

export const AccountForm = ({
  initialValues,
  mode,
  onClose,
  setValues,
}: Props) => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    CATEGORY_SELECTOR.visibleCategoriesSelector
  );

  const uid = useUID();
  useStoreErrorObserver("accounts");
  const { createToast } = useToast();
  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const {
    errors,
    onSubmitForm,
    getValues,
    getValue,
    onChangeForm,
    setValue,
    formRef,
  } = useForm<Components.Form.Account>(
    {
      "account-color": mode === "edit" ? initialValues.color : "",
      "account-amount": mode === "edit" ? initialValues.amount : 0,
      "account-name": mode === "edit" ? initialValues.name : "",
      "account-currency": mode === "edit" ? initialValues.currency : "$",
      "is-create-transaction-after-change-account": "yes",
      "transaction-category-id": "",
    },
    {
      updateOnChange: (_, values) => setValues(values),
      notValidateFields: mode === "edit" ? [] : ["transaction-category-id"],
      beforeSubmit: ({ values }) => {
        return {
          notValidateFields:
            mode === "edit" &&
            values["is-create-transaction-after-change-account"] === "yes" &&
            +values["account-amount"] !== initialValues.amount
              ? []
              : [],
        };
      },
    }
  );

  const onCreateAdditionalTransaction = ({
    accountId,
    categoryId,
  }: {
    accountId: string;
    categoryId: string;
  }) => {
    const values = getValues();

    if (mode === "edit") {
      dispatch(
        transactionsAddTransaction({
          transaction: {
            description: "",
            categoryId,
            accountId,
            amount: Math.abs(initialValues.amount - +values["account-amount"]),
            date: getActualFirestoreFormatDate() as unknown as string,
            type:
              initialValues.amount < +values["account-amount"]
                ? "income"
                : "withdraw",
            toAccountId: "",
            deleted: false,
          },
          uid,
          withoutModyfingAccount: true,
        })
      );
    }
  };

  const onSuccessSubmit = () => {
    const values = getValues();

    startLoading({ submitting: true });

    if (mode === "create") {
      dispatch(
        accountsAddAccount({
          account: {
            name: values["account-name"],
            color: values["account-color"],
            type: "regular",
            amount: +values["account-amount"],
            currency: values[
              "account-currency"
            ] as Shared.Currencies.CurrencySymbols,
            deleted: false,
          },
          uid: uid,
        })
      )
        .then(() => {
          onClose(true);
          createToast("account created", "success");
        })
        .finally(() => endLoading());
    }

    debugger;
    if (mode === "edit") {
      dispatch(
        accountsEditAccount({
          account: {
            name: values["account-name"],
            color: values["account-color"],
            amount: +values["account-amount"],
            currency: values[
              "account-currency"
            ] as Shared.Currencies.CurrencySymbols,
            id: initialValues.id,
            deleted: false,
          },
          uid,
        })
      )
        .then((res) => {
          if (
            mode === "edit" &&
            values["is-create-transaction-after-change-account"] === "yes" &&
            +values["account-amount"] !== initialValues.amount
          ) {
            onCreateAdditionalTransaction({
              accountId: res.meta.arg.account.id,
              categoryId: values["transaction-category-id"],
            });
          }
          onClose(true);
          createToast("account updated", "success");
        })
        .finally(() => endLoading());
    }
  };

  const actionManager = (type: string) => () => {
    if (isLoading) return;
    switch (type) {
      case "onSuccessSubmit":
        return onSuccessSubmit();
    }
  };

  const appropriateCategories: Store.Category[] = useMemo(() => {
    return categories.filter((category) => category.type === "income");
  }, [categories]);

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Form.Items>
        <Form.Item
          error={errors["account-name"]}
          htmlFor="account-name"
          label="Account name"
        >
          <Input
            error={Boolean(errors["account-name"])}
            id="account-name"
            name="account-name"
            placeholder="Enter account name..."
          />
        </Form.Item>

        <Form.Item
          error={errors["account-amount"]}
          htmlFor="account-amount"
          label="Amount"
        >
          <Input
            id="account-amount"
            name="account-amount"
            type="number"
            placeholder="Enter amount..."
            error={Boolean(errors["account-amount"])}
            step="any"
          />
        </Form.Item>

        <Form.Item
          htmlFor="account-currency"
          label="Currency"
          error={errors["account-currency"]}
        >
          <Select<{
            name: Shared.Currencies.CurrencySymbols;
            value: Shared.Currencies.CurrencySymbols;
          }>
            mode="single"
            placeholder="Select currency..."
            name="account-currency"
            error={Boolean(errors["account-currency"])}
            items={PLATFORM_CURRENCIES_LIST}
            parseItem={(item) => item.name}
            selectedCallback={(currency) =>
              getValue("account-currency") === currency.value
            }
            onChangeValue={(e) => {
              setValue("account-currency", e.value);
            }}
            Component={SelectOption}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                {children}
              </Flex>
            )}
          />
        </Form.Item>

        <Form.Item
          htmlFor="account-color"
          label="Color"
          error={errors["account-color"]}
        >
          <ColorPicker
            value={mode === "edit" ? initialValues.color : ""}
            id="account-color"
            name="account-color"
          />
        </Form.Item>

        <Form.Item
          visible={
            mode === "edit" &&
            +getValue("account-amount") !== initialValues.amount
          }
          label="Create transaction?"
          error={errors["is-create-transaction-after-change-account"]}
          htmlFor="is-create-transaction-after-change-account"
        >
          <RadioGroup
            data={RADIO_GROUP_DATA}
            id="is-create-transaction-after-change-account"
            name="is-create-transaction-after-change-account"
          />
        </Form.Item>

        <Form.Item
          visible={
            mode === "edit" &&
            getValue("is-create-transaction-after-change-account") === "yes" &&
            +getValue("account-amount") !== initialValues.amount
          }
          error={errors["transaction-category-id"]}
          htmlFor="transaction-category-id"
          label="Category"
        >
          <Select<Store.Category>
            placeholder="Select category..."
            className="flex flex-column flex-gap-8"
            mode="single"
            name="transaction-category-id"
            error={Boolean(errors["transaction-category-id"])}
            items={appropriateCategories}
            parseItem={(item) => {
              if (item.deleted) {
                return `${item.name} (Deleted)`;
              }
              return item.name;
            }}
            selectedCallback={(account) =>
              getValue("transaction-category-id") === account.id
            }
            onChangeValue={(e) => {
              setValue("transaction-category-id", e.id);
            }}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "12px" }} column gap={8}>
                {children}
              </Flex>
            )}
            Component={({ onClick, selected, data }) => (
              <Category
                style={{ width: "100%" }}
                data={data}
                onClick={() => onClick(data)}
                selected={selected}
              />
            )}
          />
        </Form.Item>

        <Flex column gap={12}>
          <Button type="submit" theme="primary" disabled={isLoading}>
            {isLoading && loadingData.current?.submitting && (
              <Spinner size={16} />
            )}
            <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
          </Button>
        </Flex>
      </Form.Items>
    </form>
  );
};
