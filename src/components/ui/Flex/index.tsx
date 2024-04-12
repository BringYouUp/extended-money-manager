import { cn } from "@utils";
import styles from "./index.module.css";

import { MouseEventHandler, ReactNode } from "react";

type Props = {
  column?: boolean;
  full?: boolean;
  w100?: boolean;
  h100?: boolean;
  center?: boolean;
  justifyBetween?: boolean;
  justifyFlexEnd?: boolean;
  alignFlexEnd?: boolean;
  alignCenter?: boolean;
  gap?: string | number;
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
};

export const Flex: React.FC<Props> = ({
  column,
  full,
  w100,
  h100,
  center,
  justifyBetween,
  justifyFlexEnd,
  alignFlexEnd,
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
          ["w-100"]: w100,
          ["h-100"]: h100,
          [styles.center]: center,
          [styles.gap]: gap,
          [styles.justifyBetween]: justifyBetween,
          [styles.alignCenter]: alignCenter,
          [styles.justifyFlexEnd]: justifyFlexEnd,
          [styles.alignFlexEnd]: alignFlexEnd,
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
