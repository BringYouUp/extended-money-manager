import { cn } from "@utils";
import styles from "./index.module.css";
import { ReactNode } from "react";

type Props = {
  full?: boolean;
  none?: boolean;
  w100?: boolean;
  h100?: boolean;
  hidden?: boolean;
  hiddenX?: boolean;
  overlay?: boolean;
  stableGutter?: boolean;
  auto?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export const Scrollable: React.FC<Props> = ({
  hidden,
  none,
  hiddenX,
  full,
  w100,
  h100,
  auto,
  stableGutter,
  overlay,
  style,
  className,
  children,
}) => {
  return (
    <div
      style={style}
      className={cn(
        styles.scrollable,
        {
          full,
          w100,
          h100,
          [styles.overlay]: overlay,
          [styles.none]: none,
          [styles.hidden]: hidden,
          [styles.hiddenX]: hiddenX,
          [styles.auto]: auto,
          [styles.stableGutter]: stableGutter,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
