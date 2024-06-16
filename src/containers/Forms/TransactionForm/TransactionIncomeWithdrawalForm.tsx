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
  useToast,
} from "@hooks";
import { getActualFirestoreFormatDate, getConvertedValue } from "@utils";
import { useEffect, useMemo } from "react";
import { useStoreErrorObserver } from "src/hooks/useStoreErrorObserver";
import {
  ACCOUNT_SELECTOR,
  CATEGORY_SELECTOR,
  PLATFORM_SELECTOR,
} from "src/store/slices/selectors";

type Props = Components.Form.TransactionProps & {
  onClose: (...args: unknown[]) => void;
  transactionType: Exclude<Store.TransactionType, "transfer">;
  isFormChanged: React.MutableRefObject<boolean>;
};

export const TransactionIncomeWithdrawalForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  transactionType,
  isFormChanged,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const categories = useAppSelector(CATEGORY_SELECTOR.allCategoriesSelector);
  const currencies = useAppSelector(PLATFORM_SELECTOR.currencies);

  const uid = useUID();
  const forceUpdate = useForceUpdate();
  useStoreErrorObserver("transactions");
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
  } = useForm<Components.Form.Transaction>(
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
      "transaction-to-amount": mode === "edit" ? data.toAmount || 0 : 0,
    },
    {
      updateOnChange: updateOnChangeCheckForAmountInput,
      beforeSubmit: ({ values }) => {
        const fromCategory = categories.find(
          (category) => category.id === values["transaction-category-id"]
        );
        const toAccount = accounts.find(
          (account) => account.id === values["transaction-account-id"]
        );
        return {
          notValidateFields:
            fromCategory?.currency !== toAccount?.currency
              ? []
              : ["transaction-to-amount"],
        };
      },
    }
  );

  function updateOnChangeCheckForAmountInput(
    e: React.ChangeEvent<
      HTMLFormElement & Hooks.UseForm.FormFields<Components.Form.Transaction>
    >,
    values: {
      [K in keyof Components.Form.Transaction]: Components.Form.Transaction[K];
    }
  ): void {
    if (e.target.nodeName !== "FORM" && isFormChanged !== null) {
      isFormChanged.current = true;
    }

    if (e.target.name === "transaction-amount" && e.target.value) {
      const [fromCategory, toAccount] = fromCategoryToAccount;

      if (fromCategory?.currency !== toAccount?.currency) {
        const newValue = getConvertedValue({
          from: fromCategory?.currency,
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
            categoryId: values["transaction-category-id"],
            accountId: values["transaction-account-id"],
            amount: +values["transaction-amount"],
            date: getActualFirestoreFormatDate(
              values["transaction-date"]
            ) as unknown as string,
            type: values["transaction-type"] as Store.TransactionType,
            toAccountId: "",
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
            categoryId: values["transaction-category-id"],
            accountId: values["transaction-account-id"],
            toAccountId: "",
            amount: +values["transaction-amount"],
            date: values["transaction-date"],
            type: data.type as "withdraw" | "income",
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

  const actionManager = (type: string) => () => {
    if (isLoading) return;
    switch (type) {
      case "onSuccessSubmit":
        return onSuccessSubmit();
    }
  };

  const appropriateCategories: Store.Category[] = useMemo(() => {
    return categories.filter((category) => {
      switch (mode) {
        case "create":
          return (
            category.type === transactionType &&
            (!category.deleted || initialValues?.categoryId === category.id)
          );
        case "edit":
          return (
            category.type === transactionType &&
            (!category.deleted || data.categoryId === category.id)
          );
      }
    });
  }, [mode, transactionType]);

  const appropriateAccounts: Store.Account[] = useMemo(() => {
    return accounts.filter((account) => {
      switch (mode) {
        case "create":
          return !account.deleted || initialValues?.accountId === account.id;
        case "edit":
          return !account.deleted || data.accountId === account.id;
      }
    });
  }, [mode, transactionType]);

  useEffect(() => {
    return () => {
      formRef.current &&
        !getValue("transaction-category-id") &&
        setValue("transaction-category-id", "");
    };
  }, [transactionType]);

  useEffect(() => {
    if (transactionType && formRef.current && !getValue("transaction-type")) {
      setValue("transaction-type", transactionType);
    }
  }, [transactionType]);

  const fromCategoryToAccount = useMemo(() => {
    let fromCategory;
    switch (mode) {
      case "edit":
        fromCategory = data.categoryId
          ? categories.find((category) => category.id === data.categoryId)
          : categories.find(
              (category) => category.id === getValue("transaction-category-id")
            );
        break;
      case "create":
        fromCategory = initialValues?.categoryId
          ? categories.find(
              (category) => category.id === initialValues?.categoryId
            )
          : categories.find(
              (category) => category.id === getValue("transaction-category-id")
            );
        break;
    }
    return [
      fromCategory,
      accounts.find(
        (account) => account.id === getValue("transaction-account-id")
      ) || null,
    ];
  }, [
    getValue("transaction-category-id"),
    getValue("transaction-account-id"),
    accounts,
    categories,
  ]);

  return (
    <form
      autoComplete="off"
      ref={formRef}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="w100"
      onChange={onChangeForm}
    >
      <Input hidden name="transaction-type" />
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="transaction-category-id">Category</Label>
            <Select<Store.Category>
              placeholder="Select category..."
              className="flex flex-column flex-gap-8"
              mode="single"
              name="transaction-category-id"
              error={Boolean(errors["transaction-category-id"])}
              items={appropriateCategories}
              parseItem={(item) => {
                if (item.deleted) {
                  return `${item.name}, ${item.currency} (Deleted)`;
                }
                return `${item.name}, ${item.currency}`;
              }}
              selectedCallback={(account) =>
                getValue("transaction-category-id") === account.id
              }
              onChangeValue={(e) => {
                setValue("transaction-category-id", e.id);
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
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="transaction-account-id">Account</Label>
            <Select<Store.Account>
              placeholder="Select account..."
              className="flex flex-column flex-gap-8"
              mode="single"
              name="transaction-account-id"
              error={Boolean(errors["transaction-account-id"])}
              items={appropriateAccounts}
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

        <Flex gap={16}>
          <Flex w100 column gap={6}>
            <Label htmlFor="transaction-amount">
              Amount{" "}
              {fromCategoryToAccount[0]
                ? `(${fromCategoryToAccount[0].currency})`
                : null}
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
                fromCategoryToAccount[1] &&
                fromCategoryToAccount[0]?.currency !==
                  fromCategoryToAccount[1]?.currency
                  ? "flex"
                  : "none",
            }}
            w100
            column
            gap={6}
          >
            <Label htmlFor="transaction-to-amount">
              Amount{" "}
              {fromCategoryToAccount[1]
                ? `(${fromCategoryToAccount[1]?.currency})`
                : null}
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
