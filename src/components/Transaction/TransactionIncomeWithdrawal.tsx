import { Flex, Icon, Text } from "@components";

import styles from "./index.module.css";
import { cn } from "@utils";

type Props = {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
  category: Store.Category | undefined;
  account: Store.Account | undefined;
};

export const TransactionIncomeWithdrawal: React.FC<Props> = ({
  data,
  category,
  account,
}) => {
  return (
    <>
      <Icon
        className={cn(styles.transactionIcon)}
        fill="var(--text-color-white-90)"
        size={20}
        name={category?.icon || ""}
      />
      <Flex className={cn(styles.transactionLines)}>
        <Flex className={cn(styles.line, styles.firstLine)}>
          <Text ellipsed>{category?.name}</Text>
          <Text>
            {data.type === "withdraw" && "-"}
            {data.type === "income" && "+"}
            {data.amount}
            {category?.currency}
          </Text>
        </Flex>
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
                {data.toAmount || data.amount}
                {account?.currency}
              </Text>
            </Text>
          </Flex>
        </Flex>
        {data.description && (
          <Text className={cn(styles.thirdLine)} ellipsed>
            {data.description}
          </Text>
        )}
      </Flex>
    </>
  );
};
