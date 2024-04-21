import { Flex, Icon, Text } from "@components";

import { StoreTransactionsTransaction } from "@models";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useAppSelector, useOpen } from "@hooks";
import { EditTransactionDrawer } from "@containers";
import { useMemo } from "react";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";

type Props = {
  data:
    | StoreTransactionsTransaction
    | Omit<StoreTransactionsTransaction, "id" | "createdAt">;
  style?: React.CSSProperties;
  noClick?: boolean;
};

const TransactionTransferDescription = ({ data }: Pick<Props, "data">) => {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const account = accounts.find((account) => account.id === data.accountId);
  const toAccount = accounts.find((account) => account.id === data.toAccountId);

  return (
    <>
      {account?.currency !== toAccount?.currency ? (
        <>
          {data.toAmount}
          {toAccount?.currency}{" "}
          <Text color="var(--text-color-white-50)" size={12}>
            ({data.amount}
            {account?.currency})
          </Text>
        </>
      ) : (
        <>
          {data.toAmount}
          {toAccount?.currency}{" "}
        </>
      )}
    </>
  );
};

export const Transaction: React.FC<Props> = ({ noClick, data, style }) => {
  const categories = useAppSelector(
    CATEGORY_SELECTOR.visibleCategoriesSelector
  );
  const [isOpened, onOpen, onClose] = useOpen();

  const onOpenHandler = () => {
    if (noClick) return;
    onOpen();
  };

  const category = useMemo(() => {
    return categories.find((category) => category.id === data.categoryId);
  }, [data, categories]);

  return (
    <>
      <Flex
        style={style}
        className={cn(styles.transaction, "w100", {
          [styles.withdraw]: data.type === "withdraw",
          [styles.transfer]: data.type === "transfer",
          [styles.income]: data.type === "income",
        })}
        alignCenter
        onClick={onOpenHandler}
      >
        <Flex gap={6} className={styles["transaction-container"]} alignCenter>
          <Icon fill="var(--text-color-white-90)" size={20} name={data.type} />

          <Flex flex1 gap={12} alignFlexEnd>
            <Text ellipsed>
              <Text
                weight={700}
                color="var(--text-color-white-90)"
                className={cn(styles.label)}
              >
                {data.type === "withdraw"
                  ? "-"
                  : data.type === "income"
                  ? "+"
                  : ""}
                {data.type !== "transfer" ? (
                  data.amount
                ) : data.amount === data.toAmount ? (
                  data.amount
                ) : (
                  <TransactionTransferDescription data={data} />
                )}
                {category?.currency}
              </Text>{" "}
              {data.description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <EditTransactionDrawer
        is={isOpened}
        onClose={onClose}
        data={data as StoreTransactionsTransaction}
        mode="edit"
      />
    </>
  );
};
