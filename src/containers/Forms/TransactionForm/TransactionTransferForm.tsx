import {
  transactionsAddTransaction,
  transactionsEditTransaction,
} from "@async-actions";
import {
  AccountCard,
  Button,
  Flex,
  Input,
  Label,
  Select,
  Spinner,
  Text,
  Unwrap,
} from "@components";
import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useForceUpdate,
  useLoading,
  useUID,
} from "@hooks";
import {
  FormFields,
  StoreAccountsAccount,
  StoreTransactionsTransactionType,
  TransactionTransferFormFormFields,
  TransactionFormProps,
} from "@models";
import { ACCOUNT_SELECTOR } from "@selectors";
import { ChangeEvent } from "react";

type Props = TransactionFormProps & {
  onClose: (...args: unknown[]) => void;
};

export const TransactionTransferForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(ACCOUNT_SELECTOR.visibleAccountsSelector);
  const message = useAppSelector((state) => state.transactions.error.message);

  const uid = useUID();
  const forceUpdate = useForceUpdate();

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const {
    errors,
    onChangeForm,
    onSubmitForm,
    getValues,
    getValue,
    formRef,
    setValue,
  } = useForm<TransactionTransferFormFormFields>(
    {
      "transaction-description": mode === "edit" ? data.description : "",
      "transaction-amount": mode === "edit" ? data.amount : 0,
      "transaction-to-account-id": mode === "edit" ? data.toAccountId : "",
      "transaction-account-id":
        mode === "edit" ? data.accountId : initialValues?.accountId || "",
      "transaction-date": mode === "edit" ? data.date : "",
      "transaction-type":
        mode === "edit" ? data.type : initialValues?.type || "",
    },
    {
      updateOnChange: {
        value: true,
        callback: () => {
          forceUpdate();
        },
      },
    }
  );
  const onSuccessSubmit = () => {
    const values = getValues();
    startLoading({ submitting: true });

    if (mode === "create") {
      dispatch(
        transactionsAddTransaction({
          transaction: {
            description: values["transaction-description"],
            categoryId: "",
            accountId: values["transaction-account-id"],
            amount: +values["transaction-amount"],
            date: values["transaction-date"],
            type: values[
              "transaction-type"
            ] as StoreTransactionsTransactionType,
            toAccountId: values["transaction-to-account-id"],
            deleted: false,
          },
          uid,
        })
      )
        .then(() => onClose())
        .finally(() => endLoading());
    }

    if (mode === "edit") {
      dispatch(
        transactionsEditTransaction({
          transaction: {
            id: data.id,
            description: values["transaction-description"],
            categoryId: "",
            accountId: values["transaction-account-id"],
            toAccountId: values["transaction-to-account-id"],
            amount: values["transaction-amount"],
            date: values["transaction-date"],
            type: data.type,
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
              HTMLFormElement & FormFields<TransactionTransferFormFormFields>
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
      <Input hidden name="transaction-type" />
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="transaction-account-id">Account</Label>
            <Select<StoreAccountsAccount>
              placeholder="Select account..."
              className="flex flex-column flex-gap-8"
              mode="single"
              name="transaction-account-id"
              error={Boolean(errors["transaction-account-id"])}
              items={accounts}
              parseItem={(item) => item.name}
              selectedCallback={(account) =>
                getValue("transaction-account-id") === account.id
              }
              onChange={(e) => {
                setValue("transaction-account-id", e.id);
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
                <AccountCard
                  style={{ minWidth: "revert" }}
                  data={data}
                  onClick={() => onClick(data)}
                  selected={selected}
                />
              )}
            />

            <Unwrap
              visible={Boolean(errors["transaction-account-id"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["transaction-account-id"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="transaction-to-account-id">To account</Label>
            <Select<StoreAccountsAccount>
              placeholder="To account..."
              className="flex flex-column flex-gap-8"
              mode="single"
              name="transaction-to-account-id"
              error={Boolean(errors["transaction-to-account-id"])}
              items={accounts.filter(
                (item) => item.id !== getValue("transaction-account-id")
              )}
              parseItem={(item) => item.name}
              selectedCallback={(account) =>
                getValue("transaction-to-account-id") === account.id
              }
              onChange={(e) => {
                setValue("transaction-to-account-id", e.id);
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
                <AccountCard
                  style={{ minWidth: "revert" }}
                  data={data}
                  onClick={() => onClick(data)}
                  selected={selected}
                />
              )}
            />

            <Unwrap
              visible={Boolean(errors["transaction-to-account-id"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["transaction-to-account-id"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="transaction-amount">Amount</Label>
          <Input
            type="number"
            error={Boolean(errors["transaction-amount"])}
            id="transaction-amount"
            name="transaction-amount"
            placeholder="Enter transaction amount..."
          />
          <Unwrap
            visible={Boolean(errors["transaction-amount"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["transaction-amount"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="transaction-date">Date</Label>
          <Input
            error={Boolean(errors["transaction-date"])}
            id="transaction-date"
            name="transaction-date"
            type="date"
            placeholder="Enter transaction description..."
          />
          <Unwrap
            visible={Boolean(errors["transaction-date"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["transaction-date"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="transaction-description">
            Transaction description
          </Label>
          <Input
            error={Boolean(errors["transaction-description"])}
            id="transaction-description"
            name="transaction-description"
            placeholder="Enter transaction description..."
          />
          <Unwrap
            visible={Boolean(errors["transaction-description"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["transaction-description"]}
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
