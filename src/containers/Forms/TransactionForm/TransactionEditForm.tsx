import {
  transactionsAddTransaction,
  transactionsEditTransaction,
} from "@async-actions";
import {
  AccountCard,
  Button,
  Category,
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
  TransactionFormFormFields,
  FormFields,
  StoreAccountsAccount,
  StoreCategoriesCategory,
  StoreTransactionsTransactionType,
  TransactionFormProps,
} from "@models";
import { ChangeEvent, useEffect, useMemo } from "react";
import {
  ACCOUNT_SELECTOR,
  CATEGORY_SELECTOR,
} from "src/store/slices/selectors";

type Props = TransactionFormProps & {
  onClose: (...args: unknown[]) => void;
  transactionType: Exclude<StoreTransactionsTransactionType, "transfer">;
};

export const TransactionEditForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  transactionType,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);

  const categories = useAppSelector(
    CATEGORY_SELECTOR.visibleCategoriesSelector
  );
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
  } = useForm<TransactionFormFormFields>(
    {
      "transaction-description": mode === "edit" ? data.description : "",
      "transaction-amount": mode === "edit" ? data.amount : 0,
      "transaction-category-id":
        mode === "edit" ? data.categoryId : initialValues?.categoryId || "",
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
            categoryId: values["transaction-category-id"],
            accountId: values["transaction-account-id"],
            amount: +values["transaction-amount"],
            date: values["transaction-date"],
            type: values[
              "transaction-type"
            ] as StoreTransactionsTransactionType,
            toAccountId: "",
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
            categoryId: values["transaction-category-id"],
            accountId: values["transaction-account-id"],
            toAccountId: "",
            amount: values["transaction-amount"],
            date: values["transaction-date"],
            type: data.type as "withdraw" | "income",
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
              HTMLFormElement & FormFields<TransactionFormFormFields>
            >
          );
      }
    };

  const appropriateCategories: StoreCategoriesCategory[] = useMemo(() => {
    return categories.filter((category) => category.type === transactionType);
  }, [transactionType]);

  useEffect(() => {
    return () => {
      formRef.current && setValue("transaction-category-id", "");
    };
  }, [transactionType]);

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
