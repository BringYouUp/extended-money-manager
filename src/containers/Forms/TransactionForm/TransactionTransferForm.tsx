import {
  transactionsAddTransaction,
  transactionsEditTransaction,
} from "@async-actions";
import {
  Account,
  Button,
  Flex,
  Form,
  FormItems,
  Input,
  Select,
  Spinner,
  Text,
} from "@components";
import {
  useAppDispatch,
  useAppSelector,
  useForceUpdate,
  useForm,
  useLoading,
  useStoreErrorObserver,
  useToast,
  useUID,
} from "@hooks";
import { ACCOUNT_SELECTOR, PLATFORM_SELECTOR } from "@selectors";
import { getActualFirestoreFormatDate, getConvertedValue } from "@utils";
import { useMemo } from "react";

type Props = Components.Form.TransactionProps & {
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
    onSubmitForm,
    onChangeForm,
    getValues,
    getValue,
    formRef,
    setValue,
  } = useForm<Components.Form.TransactionTransfer>(
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
          (account) => account.id === values["transaction-account-id"],
        );
        const toAccount = accounts.find(
          (account) => account.id === values["transaction-to-account-id"],
        );
        return {
          notValidateFields:
            fromAccount?.currency !== toAccount?.currency
              ? []
              : ["transaction-to-amount"],
        };
      },
    },
  );

  const fromToAccount = useMemo(() => {
    let fromAccount;
    switch (mode) {
      case "edit":
        fromAccount = data.accountId
          ? accounts.find((account) => account.id === data.accountId)
          : accounts.find(
              (account) => account.id === getValue("transaction-account-id"),
            );
        break;
      case "create":
        fromAccount = initialValues?.accountId
          ? accounts.find((account) => account.id === initialValues?.accountId)
          : accounts.find(
              (account) => account.id === getValue("transaction-account-id"),
            );
        break;
    }
    return [
      fromAccount,
      accounts.find(
        (account) => account.id === getValue("transaction-to-account-id"),
      ) || null,
    ];
  }, [
    getValue("transaction-account-id"),
    getValue("transaction-to-account-id"),
    accounts,
  ]);

  function updateOnChangeCheckForAmountInput(
    e: React.ChangeEvent<
      HTMLFormElement &
        Hooks.UseForm.FormFields<Components.Form.TransactionTransfer>
    >,
    values: {
      [K in keyof Components.Form.TransactionTransfer]: Components.Form.TransactionTransfer[K];
    },
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
              values["transaction-date"],
            ) as unknown as string,
            type: "transfer",
            toAccountId: values["transaction-to-account-id"],
            deleted: false,
            toAmount:
              +values["transaction-to-amount"] || +values["transaction-amount"],
          },
          uid,
        }),
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
        }),
      )
        .then(() => {
          onClose(true);
          createToast("transaction updated", "success");
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

  const appropriateAccounts: Store.Account[] = useMemo(() => {
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
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Input hidden name="transaction-type" />
      <FormItems>
        <Form.Item
          htmlFor="transaction-account-id"
          label="Account"
          error={errors["transaction-account-id"]}
        >
          <Select<Store.Account>
            placeholder="Select account..."
            className="flex flex-column flex-gap-8"
            mode="single"
            name="transaction-account-id"
            error={Boolean(errors["transaction-account-id"])}
            items={appropriateAccounts.filter(
              (item) => item.id !== getValue("transaction-to-account-id"),
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
            onChangeValue={(e) => {
              setValue("transaction-account-id", e.id);
            }}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "12px" }} column gap={8}>
                {children}
              </Flex>
            )}
            Component={({ onClick, selected, data }) => (
              <Account
                style={{ minWidth: "revert" }}
                data={data}
                onClick={() => onClick(data)}
                selected={selected}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          htmlFor="transaction-to-account-id"
          label="To account"
          error={errors["transaction-to-account-id"]}
        >
          <Select<Store.Account>
            placeholder="To account..."
            className="flex flex-column flex-gap-8"
            mode="single"
            name="transaction-to-account-id"
            error={Boolean(errors["transaction-to-account-id"])}
            items={appropriateAccounts.filter(
              (item) => item.id !== getValue("transaction-account-id"),
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
            onChangeValue={(e) => {
              setValue("transaction-to-account-id", e.id);
            }}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "12px" }} column gap={8}>
                {children}
              </Flex>
            )}
            Component={({ onClick, selected, data }) => (
              <Account
                style={{ minWidth: "revert" }}
                data={data}
                onClick={() => onClick(data)}
                selected={selected}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          htmlFor="transaction-amount"
          label={`Amount${" "}${
            fromToAccount[0] ? `(${fromToAccount[0]?.currency})` : null
          }`}
          error={errors["transaction-amount"]}
        >
          <Input
            type="number"
            error={Boolean(errors["transaction-amount"])}
            id="transaction-amount"
            name="transaction-amount"
            placeholder="Enter amount"
            step="any"
          />
        </Form.Item>

        <Form.Item
          htmlFor="transaction-date"
          label="Date"
          error={errors["transaction-date"]}
        >
          <Input
            error={Boolean(errors["transaction-date"])}
            id="transaction-date"
            name="transaction-date"
            type="date"
            placeholder="Enter transaction description..."
          />
        </Form.Item>

        <Form.Item
          htmlFor="transaction-description"
          label="Transaction description"
          error={errors["transaction-description"]}
        >
          <Input
            error={Boolean(errors["transaction-description"])}
            id="transaction-description"
            name="transaction-description"
            placeholder="Enter transaction description..."
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
      </FormItems>
    </form>
  );
};
