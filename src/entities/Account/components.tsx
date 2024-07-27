import { MouseEventHandler, ReactNode } from "react";

import { Flex, Icon, Offset, Text } from "@ui";
import { cn } from "@utils/styles";
import styles from "./index.module.css";

const AccountInfo = ({ deleted, name }: { deleted: boolean; name: string }) => {
  return (
    <Flex alignCenter w100 gap={6}>
      {deleted && (
        <Icon fill="var(--text-color-white-90)" name="trash" size={12} />
      )}
      <Text
        ellipsed
        right
        size={12}
        weight={500}
        color="var(--text-color-white-90)"
      >
        {name ? name : <Text color="var(--text-color-white-50)">Name...</Text>}
      </Text>
    </Flex>
  );
};

const AccountAmount = ({
  amount,
  currency,
}: {
  amount: number;
  currency: keyof Shared.Currencies.CurrencyDefinition;
}) => {
  return (
    <Flex gap={6}>
      <Text
        style={{ flex: 1 }}
        ellipsed
        right
        size={24}
        weight={700}
        color="var(--text-color-white-90)"
      >
        {amount ? (
          amount.toFixed(2)
        ) : (
          <Text color="var(--text-color-white-50)">0</Text>
        )}
      </Text>
      <Text right size={24} weight={700} color="var(--text-color-white-90)">
        {currency || "$"}
      </Text>
    </Flex>
  );
};

const AccountWrap = ({
  style,
  selected,
  deleted,
  color,
  onClick,
  children,
  empty,
}: {
  style?: React.CSSProperties;
  noClick?: boolean;
  selected?: boolean;
  empty?: boolean;
  deleted?: boolean;
  color: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Flex
      style={
        {
          ["--account-color"]: color,
          ...style,
        } as React.CSSProperties
      }
      className={cn(styles.account, {
        [styles.empty]: empty,
        [styles.selected]: selected,
        [styles.deleted]: deleted,
      })}
      column
      onClick={onClick}
    >
      <Offset padding={[16]} className={styles.container}>
        <Flex full column gap={16} alignFlexEnd justifyBetween>
          {children}
        </Flex>
      </Offset>
    </Flex>
  );
};

const AccountEmpty = () => {
  return (
    <Flex full center gap={6}>
      <Icon name="plus" fill="var(--text-color-white)" />
      <Text size={14} weight={600} color="var(--text-color-white)">
        Add account
      </Text>
    </Flex>
  );
};

export default {
  AccountInfo,
  AccountAmount,
  AccountWrap,
  AccountEmpty,
};
