import {
  Flex,
  Skeleton,
  Text,
  Transaction,
  TransactionEmpty,
} from "@components";

import { useAppSelector } from "@hooks";
import styles from "./index.module.css";
import { TRANSACTION_SELECTOR } from "@selectors";

type Props = {
  withAdd: boolean;
} & (
  | {
      count: number;
      all?: never;
    }
  | {
      all: boolean;
      count?: never;
    }
);

export const Transactions = ({ count, all, withAdd }: Props) => {
  const transactions = useAppSelector(
    TRANSACTION_SELECTOR.visibleCategoriesSelector
  );
  const status = useAppSelector((state) => state.transactions.status);

  if (status === "transactions/transactionsSetTransactions/pending") {
    return new Array(count).fill(null).map((_, index) => {
      return (
        <Skeleton
          key={index}
          style={{ height: "77px" }}
          className={styles.transaction}
        />
      );
    });
  }

  if (transactions.length === 0) {
    return (
      <Flex w100 center column gap={8}>
        <Text as="h4">You have not any transaction</Text>
        <TransactionEmpty style={{ width: "var(--transaction-list-width)" }} />
      </Flex>
    );
  }

  return (
    <>
      {transactions.slice(0, all ? Infinity : count).map((transaction) => (
        <Transaction key={transaction.id} data={transaction} />
      ))}
      {withAdd ? <TransactionEmpty /> : null}
    </>
  );
};
