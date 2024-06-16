import {
  Flex,
  TransactionIncomeWithdrawal,
  TransactionTransfer,
} from "@components";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useAppSelector, useOpen } from "@hooks";
import { EditTransactionDrawer } from "@containers";
import { useMemo } from "react";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";

type Props = {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
  style?: React.CSSProperties;
  noClick?: boolean;
};

export const Transaction: React.FC<Props> = ({ noClick, data, style }) => {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
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

  const account = useMemo(() => {
    return accounts.find((account) => account.id === data.accountId);
  }, [data, accounts]);

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
        <Flex gap={8} className={styles["transaction-container"]}>
          {(data.type === "income" || data.type === "withdraw") && (
            <TransactionIncomeWithdrawal
              account={account}
              category={category}
              data={data}
            />
          )}

          {data.type === "transfer" && <TransactionTransfer data={data} />}
        </Flex>
      </Flex>
      <EditTransactionDrawer
        is={isOpened}
        onClose={onClose}
        data={data as Store.Transaction}
        mode="edit"
      />
    </>
  );
};
