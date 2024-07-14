import { Flex, Icon, Text, Transaction } from "@components";
import { useAppSelector } from "@hooks";
import { ACCOUNT_SELECTOR } from "@selectors";
import { cn } from "@utils";
import { ReactNode } from "react";

import styles from "./index.module.css";

const TransactionWrap = ({
  style,
  children,
  type,
  empty,
  onClick,
}: {
  children: ReactNode;
  type?: Store.TransactionType;
  style?: React.CSSProperties;
  empty?: boolean;
  onClick: () => void;
}) => {
  return (
    <Flex
      style={style}
      className={cn(styles.transaction, "w100", {
        [styles.withdraw]: type === "withdraw",
        [styles.transfer]: type === "transfer",
        [styles.income]: type === "income",
        [styles.empty]: empty,
      })}
      alignCenter
      onClick={onClick}
    >
      <Flex
        gap={8}
        className={styles["transaction-container"]}
        alignCenter={empty}
      >
        {children}
      </Flex>
    </Flex>
  );
};

const TransactionIcon = ({
  className,
  name,
}: {
  className?: string;
  name: string;
}) => {
  return <Icon size={20} name={name} className={className} />;
};

const TransactionContent = ({ children }: { children: ReactNode }) => {
  return <Flex className={cn(styles.transactionLines)}>{children}</Flex>;
};

const TransactionInfo = ({
  type,
  title,
  amount,
  currency,
}: {
  title: string | undefined;
  type?: Store.TransactionType;
  amount: number;
  currency: keyof Shared.Currencies.CurrencyDefinition | undefined;
}) => {
  return (
    <Flex className={cn(styles.line, styles.firstLine)}>
      <Text ellipsed>{title}</Text>
      <Text>
        {type === "withdraw" && "-"}
        {type === "income" && "+"}
        {amount}
        {currency}
      </Text>
    </Flex>
  );
};

const TransactionSubInfo = ({
  type,
  toAmount,
  amount,
  currency,
  name,
}: {
  type: Store.TransactionType;
  toAmount?: number | undefined;
  amount: number;
  currency: keyof Shared.Currencies.CurrencyDefinition | undefined;
  name: string | undefined;
}) => {
  return (
    <Flex className={cn(styles.line, styles.secondLine)}>
      <Flex gap={6} justifyBetween alignCenter w100>
        <Text ellipsed>
          <Flex gap={6} alignCenter>
            <Icon size={14} name={type} />
            <Text ellipsed>{name}</Text>
          </Flex>
        </Text>
        <Text>
          <Text>
            {toAmount || amount}
            {currency && currency}
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
};

const TransactionDescription = ({ description }: { description: string }) => {
  return (
    <Text className={cn(styles.thirdLine)} ellipsed>
      {description}
    </Text>
  );
};

const TransactionIncomeWithdrawal = ({
  data,
  category,
  account,
}: {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
  category: Store.Category | undefined;
  account: Store.Account | undefined;
}) => {
  return (
    <>
      <Transaction.Icon
        className={cn(styles.transactionIcon)}
        name={category?.icon || ""}
      />
      <Transaction.Content>
        <Transaction.Info
          title={category?.name}
          amount={data.amount}
          currency={category?.currency}
          type={data.type}
        />
        <Transaction.SubInfo
          type={data.type}
          amount={data.amount}
          toAmount={data.toAmount}
          currency={account?.currency}
          name={account?.name}
        />
        {data.description && (
          <Transaction.Description description={data.description} />
        )}
      </Transaction.Content>
    </>
  );
};

const TransactionTransfer = ({
  data,
}: {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
}) => {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const account = accounts.find((account) => account.id === data.accountId);
  const toAccount = accounts.find((account) => account.id === data.toAccountId);

  return (
    <>
      <Transaction.Icon
        className={cn(styles.transactionIcon)}
        name="bank-card"
      />
      <Transaction.Content>
        <Transaction.Info
          amount={data.amount}
          currency={toAccount?.currency}
          title={toAccount?.name}
          type={data.type}
        />
        {account?.currency !== toAccount?.currency && (
          <Transaction.SubInfo
            type={data.type}
            amount={data.amount}
            currency={account?.currency}
            name={account?.name}
          />
        )}
        {data.description && (
          <Transaction.Description description={data.description} />
        )}
      </Transaction.Content>
    </>
  );
};

export default {
  TransactionWrap,
  TransactionIcon,
  TransactionContent,
  TransactionInfo,
  TransactionSubInfo,
  TransactionDescription,
  TransactionIncomeWithdrawal,
  TransactionTransfer,
};
