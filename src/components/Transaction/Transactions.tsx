import {
  Flex,
  Skeleton,
  Text,
  Transaction,
  TransactionEmpty,
} from "@components";

import { useAppSelector } from "@hooks";
import styles from "./index.module.css";

type Props = {
  withAdd: boolean;
  transactions: Store.Transaction[];
  countTransactions: number;
  countPlaceholders: number;
  isPending?: boolean;
};

export const Transactions = ({
  transactions,
  countTransactions,
  countPlaceholders,
  withAdd,
  isPending,
}: Props) => {
  const status = useAppSelector((state) => state.transactions.status);

  if (
    isPending ||
    status === "transactions/transactionsSetTransactions/pending"
  ) {
    return new Array(countPlaceholders).fill(null).map((_, index) => {
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
      {transactions.slice(0, countTransactions).map((transaction) => (
        <Transaction key={transaction.id} data={transaction} />
      ))}
      {withAdd ? <TransactionEmpty /> : null}
    </>
  );
};
