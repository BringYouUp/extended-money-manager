import { cn } from "@utils";
import styles from "./index.module.css";

import { MouseEventHandler, ReactNode } from "react";

type Props = {
  column?: boolean;
  columnReverse?: boolean;
  full?: boolean;
  w100?: boolean;
  h100?: boolean;
  center?: boolean;
  justifyBetween?: boolean;
  justifyFlexEnd?: boolean;
  justifyCenter?: boolean;
  alignFlexEnd?: boolean;
  alignCenter?: boolean;
  alignStart?: boolean;
  gap?: string | number;
  wrap?: boolean;
  flex1?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
};

export const Flex: React.FC<Props> = ({
  column,
  columnReverse,
  full,
  w100,
  h100,
  flex1,
  center,
  justifyBetween,
  justifyCenter,
  justifyFlexEnd,
  alignFlexEnd,
  alignStart,
  alignCenter,
  gap,
  wrap,
  onClick,
  style,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      style={
        {
          "--flex-gap": gap && `${gap}px`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.flex,
        {
          [styles.column]: column,
          full,
          w100,
          h100,
          [styles.flex1]: flex1,
          [styles.center]: center,
          [styles.gap]: gap,
          [styles.justifyBetween]: justifyBetween,
          [styles.alignCenter]: alignCenter,
          [styles.alignStart]: alignStart,
          [styles.justifyFlexEnd]: justifyFlexEnd,
          [styles.alignFlexEnd]: alignFlexEnd,
          [styles.justifyCenter]: justifyCenter,
          [styles.columnReverse]: columnReverse,
          [styles.wrap]: wrap,
        },
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};
