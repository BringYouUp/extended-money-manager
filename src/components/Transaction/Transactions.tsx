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

export const Transactions = () => {
  const transactions = useAppSelector(
    TRANSACTION_SELECTOR.visibleCategoriesSelector
  );
  const status = useAppSelector((state) => state.transactions.status);

  if (status === "transactions/transactionsSetTransactions/pending") {
    return new Array(7).fill(null).map((_, index) => {
      return <Skeleton key={index} className={styles.transaction} />;
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
      {transactions.map((transaction) => (
        <Transaction key={transaction.id} data={transaction} />
      ))}
      <TransactionEmpty />
    </>
  );
};
