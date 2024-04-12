import { accountsAddAccount, accountsEditAccount } from "@async-actions";
import {
  Button,
  ColorPicker,
  Flex,
  Input,
  Label,
  Select,
  SelectOption,
  Spinner,
  Text,
  Unwrap,
} from "@components";

import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useLoading,
  useUID,
} from "@hooks";
import {
  AccountFormFormFields,
  FormFields,
  StoreAccountsAccount,
  StoreAccountsAccountCurrencies,
} from "@models";
import { ChangeEvent } from "react";

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
  const message = useAppSelector((state) => state.accounts.error.message);

  const uid = useUID();

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
    },
    {
      updateOnChange: {
        value: true,
        callback: (_, values) => {
          setValues(values);
        },
      },
    }
  );

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
        .then(() => onClose())
        .finally(() => endLoading());
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
        .then(() => onClose())
        .finally(() => endLoading());
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

        <Flex column gap={8}>
          <Unwrap visible={Boolean(message)} negativeOffset="6px">
            <Text size={11} color="var(--text-color-error)">
              {message}
            </Text>
          </Unwrap>
          <Flex column gap={12}>
            <Button type="submit" theme="primary" disabled={isLoading}>
              {isLoading && loadingData.current?.submitting && (
                <Spinner size={16} />
              )}
              <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
