import {
  accountsAddAccount,
  accountsEditAccount,
  transactionsAddTransaction,
} from "@async-actions";
import {
  Button,
  Category,
  ColorPicker,
  Flex,
  Input,
  Label,
  Select,
  SelectOption,
  Spinner,
  Text,
  Toggle,
  Unwrap,
} from "@components";

import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useLoading,
  useToast,
  useUID,
} from "@hooks";
import {
  AccountFormFormFields,
  FormFields,
  StoreAccountsAccount,
  StoreAccountsAccountCurrencies,
  StoreCategoriesCategory,
} from "@models";
import { CATEGORY_SELECTOR } from "@selectors";
import { getActualFormatDate } from "@utils";
import { ChangeEvent, useMemo } from "react";
import { useStoreErrorObserver } from "src/hooks/useStoreErrorObserver";

type Edit = {
  mode: "edit";
  data: StoreAccountsAccount;
};

type Create = {
  mode: "create";
  data?: unknown;
};

type Props = {
  onClose: (...args: unknown[]) => void;
  setValues: (values: AccountFormFormFields) => void;
} & (Create | Edit);

export const AccountForm = ({ data, mode, onClose, setValues }: Props) => {
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
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    setValue,
    formRef,
  } = useForm<AccountFormFormFields>(
    {
      "account-color": mode === "edit" ? data.color : "",
      "account-amount": mode === "edit" ? data.amount : 0,
      "account-name": mode === "edit" ? data.name : "",
      "account-currency": mode === "edit" ? data.currency : "$",
      "is-create-transaction-after-change-account": true,
      "transaction-category-id": "",
    },
    {
      updateOnChange: (_, values) => setValues(values),
      notValidateFields: mode === "edit" ? [] : ["transaction-category-id"],
      beforeSubmit: ({ values }) => ({
        notValidateFields:
          mode === "edit" &&
          values["is-create-transaction-after-change-account"] &&
          +values["account-amount"] !== data.amount
            ? []
            : ["transaction-category-id"],
      }),
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
            amount: Math.abs(data.amount - +values["account-amount"]),
            date: getActualFormatDate().split("T")[0],
            type:
              data.amount < +values["account-amount"] ? "income" : "withdraw",
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
            ] as StoreAccountsAccountCurrencies,
            deleted: false,
          },
          uid: uid,
        })
      )
        .then(() => {
          onClose();
          createToast("account created", "success");
        })
        .finally(() => {
          endLoading();
          onClose();
        });
    }

    if (mode === "edit") {
      dispatch(
        accountsEditAccount({
          account: {
            name: values["account-name"],
            color: values["account-color"],
            amount: +values["account-amount"],
            currency: values[
              "account-currency"
            ] as StoreAccountsAccountCurrencies,
            id: data.id,
            deleted: false,
          },
          uid,
        })
      )
        .then((res) => {
          if (
            mode === "edit" &&
            values["is-create-transaction-after-change-account"] &&
            +values["account-amount"] !== data.amount
          ) {
            onCreateAdditionalTransaction({
              accountId: res.meta.arg.account.id,
              categoryId: values["transaction-category-id"],
            });
          }
          onClose();
          createToast("account updated", "success");
        })
        .finally(() => {
          endLoading();
          onClose();
        });
    }
  };

  const actionManager =
    (type: string) =>
    (...data: unknown[]) => {
      if (isLoading) return;
      switch (type) {
        case "onSuccessSubmit":
          return onSuccessSubmit();
        case "onChangeForm":
          return onChangeForm(
            data[0] as ChangeEvent<
              HTMLFormElement & FormFields<AccountFormFormFields>
            >
          );
      }
    };

  const appropriateCategories: StoreCategoriesCategory[] = useMemo(() => {
    return categories.filter((category) => category.type === "income");
  }, [categories]);

  console.log(`→ getValues()`, getValues());

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onChange={actionManager("onChangeForm")}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
    >
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Label htmlFor="account-name">Account name</Label>
          <Input
            error={Boolean(errors["account-name"])}
            id="account-name"
            name="account-name"
            placeholder="Enter account name..."
          />
          <Unwrap
            visible={Boolean(errors["account-name"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["account-name"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="account-amount">Amount </Label>
            <Input
              id="account-amount"
              name="account-amount"
              type="number"
              placeholder="Enter amount..."
              error={Boolean(errors["account-amount"])}
              step="any"
            />
            <Unwrap
              visible={Boolean(errors["account-amount"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["account-amount"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="account-currency">Currency</Label>
            <Select<{
              name: StoreAccountsAccountCurrencies;
              value: StoreAccountsAccountCurrencies;
            }>
              mode="single"
              placeholder="Select currency..."
              name="account-currency"
              error={Boolean(errors["account-currency"])}
              items={[
                { name: "$", value: "$" },
                { name: "€", value: "€" },
                { name: "₽", value: "₽" },
                { name: "zł", value: "zł" },
              ]}
              parseItem={(item) => item.name}
              selectedCallback={(currency) =>
                getValue("account-currency") === currency.value
              }
              onChange={(e) => {
                setValue("account-currency", e.value);
              }}
              Component={SelectOption}
              Wrapper={({ children }) => (
                <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                  {children}
                </Flex>
              )}
            />

            <Unwrap
              visible={Boolean(errors["account-currency"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["account-currency"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="account-color">Color</Label>
          <ColorPicker
            value={mode === "edit" ? data.color : ""}
            id="account-color"
            name="account-color"
          />
          <Unwrap
            visible={Boolean(errors["account-color"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["account-color"]}
            </Text>
          </Unwrap>
        </Flex>

        {/* // */}

        <Flex
          style={{
            display:
              mode === "edit" && +getValue("account-amount") !== data.amount
                ? "flex"
                : "none",
          }}
          w100
          column
          gap={6}
        >
          <Label htmlFor="is-create-transaction-after-change-account">
            Create transaction?
          </Label>
          <Toggle
            data={{
              checked: {
                label: "Yes",
              },
              unchecked: {
                label: "No",
              },
            }}
            id="is-create-transaction-after-change-account"
            name="is-create-transaction-after-change-account"
          />
          <Unwrap
            visible={Boolean(
              errors["is-create-transaction-after-change-account"]
            )}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["is-create-transaction-after-change-account"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex
          style={{
            display:
              mode === "edit" &&
              getValue("is-create-transaction-after-change-account") &&
              +getValue("account-amount") !== data.amount
                ? "flex"
                : "none",
          }}
          w100
          column
          gap={6}
        >
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="transaction-category-id">Category</Label>
            <Select<StoreCategoriesCategory>
              placeholder="Select category..."
              className="flex flex-column flex-gap-8"
              mode="single"
              name="transaction-category-id"
              error={Boolean(errors["transaction-category-id"])}
              items={appropriateCategories}
              parseItem={(item) => item.name}
              selectedCallback={(account) =>
                getValue("transaction-category-id") === account.id
              }
              onChange={(e) => {
                setValue("transaction-category-id", e.id);
              }}
              Wrapper={({ children }) => (
                <Flex
                  style={{ width: "264px", padding: "6px 12px 6px 16px" }}
                  column
                  gap={8}
                >
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

            <Unwrap
              visible={Boolean(errors["transaction-category-id"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["transaction-category-id"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex column gap={12}>
          <Button type="submit" theme="primary" disabled={isLoading}>
            {isLoading && loadingData.current?.submitting && (
              <Spinner size={16} />
            )}
            <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
