import { Flex, Icon, Text } from "@components";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useAppSelector } from "@hooks";

import { ACCOUNT_SELECTOR } from "@selectors";

type Props = {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
};

export const TransactionTransfer = ({ data }: Props) => {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const account = accounts.find((account) => account.id === data.accountId);
  const toAccount = accounts.find((account) => account.id === data.toAccountId);

  return (
    <>
      <Icon
        className={cn(styles.transactionIcon)}
        fill="var(--text-color-white-90)"
        size={20}
        name="bank-card"
      />
      <Flex className={cn(styles.transactionLines)}>
        <Flex className={cn(styles.line, styles.firstLine)}>
          <Text ellipsed>{toAccount?.name}</Text>
          <Text>
            {data.toAmount}
            {toAccount?.currency}{" "}
          </Text>
        </Flex>
        {account?.currency !== toAccount?.currency && (
          <Flex className={cn(styles.line, styles.secondLine)}>
            <Flex gap={6} justifyBetween alignCenter w100>
              <Text ellipsed>
                <Flex gap={6} alignCenter>
                  <Icon size={14} name={data.type} />
                  <Text ellipsed>{account?.name}</Text>
                </Flex>
              </Text>
              <Text>
                <Text>
                  {data.amount}
                  {account?.currency}
                </Text>
              </Text>
            </Flex>
          </Flex>
        )}
        {data.description && (
          <Text className={cn(styles.thirdLine)} ellipsed>
            {data.description}
          </Text>
        )}
      </Flex>
    </>
  );
};
