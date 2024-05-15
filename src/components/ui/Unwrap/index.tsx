import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

type Props = {
  className?: string;
  visible: boolean;
  negativeOffset: `${string}px`;
  style?: React.CSSProperties;
  children?: ReactNode;
};

export const Unwrap: React.FC<Props> = ({
  visible,
  negativeOffset,
  style,
  children,
  className,
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
    >
      {children}
    </div>
  );
};
