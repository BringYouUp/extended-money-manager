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
  useToast,
} from "@hooks";
import {
  FormFields,
  StoreAccountsAccount,
  TransactionTransferFormFormFields,
  TransactionFormProps,
} from "@models";
import { ACCOUNT_SELECTOR, PLATFORM_SELECTOR } from "@selectors";
import { getActualFirestoreFormatDate, getConvertedValue } from "@utils";
import { ChangeEvent, useMemo } from "react";
import { useStoreErrorObserver } from "src/hooks/useStoreErrorObserver";

type Props = TransactionFormProps & {
  isFormChanged: React.MutableRefObject<boolean>;
  onClose: (...args: unknown[]) => void;
};

export const TransactionTransferForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  isFormChanged,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const currencies = useAppSelector(PLATFORM_SELECTOR.currencies);

  useStoreErrorObserver("transactions");
  const uid = useUID();
  const forceUpdate = useForceUpdate();
  const { createToast } = useToast();

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
      "transaction-type": "transfer",
      "transaction-to-amount": mode === "edit" ? data.toAmount || 0 : 0,
    },
    {
      updateOnChange: updateOnChangeCheckForAmountInput,
      beforeSubmit: ({ values }) => {
        const fromAccount = accounts.find(
          (account) => account.id === values["transaction-account-id"]
        );
        const toAccount = accounts.find(
          (account) => account.id === values["transaction-to-account-id"]
        );
        return {
          notValidateFields:
            fromAccount?.currency !== toAccount?.currency
              ? []
              : ["transaction-to-amount"],
        };
      },
    }
  );

  const fromToAccount = useMemo(() => {
    let fromAccount;
    switch (mode) {
      case "edit":
        fromAccount = data.accountId
          ? accounts.find((account) => account.id === data.accountId)
          : accounts.find(
              (account) => account.id === getValue("transaction-account-id")
            );
        break;
      case "create":
        fromAccount = initialValues?.accountId
          ? accounts.find((account) => account.id === initialValues?.accountId)
          : accounts.find(
              (account) => account.id === getValue("transaction-account-id")
            );
        break;
    }
    return [
      fromAccount,
      accounts.find(
        (account) => account.id === getValue("transaction-to-account-id")
      ) || null,
    ];
  }, [
    getValue("transaction-account-id"),
    getValue("transaction-to-account-id"),
    accounts,
  ]);

  function updateOnChangeCheckForAmountInput(
    e: React.ChangeEvent<
      HTMLFormElement & FormFields<TransactionTransferFormFormFields>
    >,
    values: {
      [K in keyof TransactionTransferFormFormFields]: TransactionTransferFormFormFields[K];
    }
  ): void {
    if (e.target.nodeName !== "FORM" && isFormChanged !== null) {
      isFormChanged.current = true;
    }

    if (e.target.name === "transaction-amount" && e.target.value) {
      const [fromAccount, toAccount] = fromToAccount;

      if (fromAccount?.currency !== toAccount?.currency) {
        const newValue = getConvertedValue({
          from: fromAccount?.currency,
          to: toAccount?.currency,
          value: values["transaction-amount"],
          currencies,
        });
        setValue("transaction-to-amount", `${newValue}`);
      } else {
        setValue("transaction-to-amount", values["transaction-amount"]);
      }
    }
    forceUpdate();
  }

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
            date: getActualFirestoreFormatDate(
              values["transaction-date"]
            ) as unknown as string,
            type: "transfer",
            toAccountId: values["transaction-to-account-id"],
            deleted: false,
            toAmount:
              +values["transaction-to-amount"] || +values["transaction-amount"],
          },
          uid,
        })
      )
        .then(() => {
          onClose(true);
          createToast("transaction created", "success");
        })
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
            amount: +values["transaction-amount"],
            date: values["transaction-date"],
            type: "transfer",
            deleted: false,
            toAmount:
              +values["transaction-to-amount"] || +values["transaction-amount"],
          },
          uid,
        })
      )
        .then(() => {
          onClose(true);
          createToast("transaction updated", "success");
        })
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

  const appropriateAccounts: StoreAccountsAccount[] = useMemo(() => {
    return accounts.filter((account) => {
      switch (mode) {
        case "create":
          return (
            !account.deleted ||
            initialValues?.accountId === account.id ||
            initialValues?.toAccountId === account.id
          );
        case "edit":
          return (
            !account.deleted ||
            data.accountId === account.id ||
            data.toAccountId === account.id
          );
      }
    });
  }, [mode]);

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
              items={appropriateAccounts.filter(
                (item) => item.id !== getValue("transaction-to-account-id")
              )}
              parseItem={(item) => {
                if (item.deleted) {
                  return `${item.name}, ${item.currency} (Deleted)`;
                }
                return `${item.name}, ${item.currency}`;
              }}
              selectedCallback={(account) =>
                getValue("transaction-account-id") === account.id
              }
              onChange={(e) => {
                setValue("transaction-account-id", e.id);
              }}
              Wrapper={({ children }) => (
                <Flex
                  style={{ width: "264px", padding: "12px" }}
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
              items={appropriateAccounts.filter(
                (item) => item.id !== getValue("transaction-account-id")
              )}
              parseItem={(item) => {
                if (item.deleted) {
                  return `${item.name}, ${item.currency} (Deleted)`;
                }
                return `${item.name}, ${item.currency}`;
              }}
              selectedCallback={(account) =>
                getValue("transaction-to-account-id") === account.id
              }
              onChange={(e) => {
                setValue("transaction-to-account-id", e.id);
              }}
              Wrapper={({ children }) => (
                <Flex
                  style={{ width: "264px", padding: "12px" }}
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

        <Flex gap={16}>
          <Flex w100 column gap={6}>
            <Label htmlFor="transaction-amount">
              Amount{" "}
              {fromToAccount[0] ? `(${fromToAccount[0]?.currency})` : null}
            </Label>
            <Input
              type="number"
              error={Boolean(errors["transaction-amount"])}
              id="transaction-amount"
              name="transaction-amount"
              placeholder="Enter amount"
              step="any"
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

          <Flex
            style={{
              display:
                fromToAccount[1] &&
                fromToAccount[0]?.currency !== fromToAccount[1]?.currency
                  ? "flex"
                  : "none",
            }}
            w100
            column
            gap={6}
          >
            <Label htmlFor="transaction-to-amount">
              Amount{" "}
              {fromToAccount[1] ? `(${fromToAccount[1]?.currency})` : null}
            </Label>
            <Input
              type="number"
              error={Boolean(errors["transaction-to-amount"])}
              id="transaction-to-amount"
              name="transaction-to-amount"
              placeholder="Enter amount"
              step="any"
            />
            <Unwrap
              visible={Boolean(errors["transaction-to-amount"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["transaction-to-amount"]}
              </Text>
            </Unwrap>
          </Flex>
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
