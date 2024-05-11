import { Flex, Offset } from "@components";

import styles from "./index.module.css";
import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@utils";

type Props = {
  selected?: boolean;
  style?: React.CSSProperties;
  onClick: MouseEventHandler<HTMLDivElement>;
  color: string;
  empty?: boolean;
  deleted?: boolean;
  children: ReactNode;
};

export const AccountCardWrap: React.FC<Props> = ({
  style,
  selected,
  color,
  onClick,
  empty,
  deleted,
  children,
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
        {children}
      </Offset>
    </Flex>
  );
};
