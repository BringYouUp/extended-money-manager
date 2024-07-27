import { ReactNode } from "react";

import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible: boolean;
  negativeOffset: `${string}px`;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const Unwrap: React.FC<Props> = ({
  visible,
  negativeOffset,
  style,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      style={
        {
          "--unwrap-negative-offset": negativeOffset,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.unwrap,
        {
          [styles.visible]: visible,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
