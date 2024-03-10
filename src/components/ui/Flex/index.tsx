import styles from "./index.module.css";

import { cn } from "../../../utils";
import { ReactNode } from "react";

type Props = {
  column?: boolean;
  full?: boolean;
  fullW?: boolean;
  fullH?: boolean;
  center?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  className?: string;
  gap?: string | number;
  style?: React.CSSProperties;
  children?: ReactNode;
};

const Flex: React.FC<Props> = ({
  column,
  full,
  fullW,
  fullH,
  center,
  justifyBetween,
  alignCenter,
  gap,
  style,
  children,
}) => {
  return (
    <div
      style={
        {
          "--flex-gap": gap && `${gap}px`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(styles.flex, {
        [styles.column]: column,
        full,
        ["full-w"]: fullW,
        ["full-h"]: fullH,
        [styles.center]: center,
        [styles.gap]: gap,
        [styles.justifyBetween]: justifyBetween,
        [styles.alignCenter]: alignCenter,
      })}
    >
      {children}
    </div>
  );
};

export default Flex;
