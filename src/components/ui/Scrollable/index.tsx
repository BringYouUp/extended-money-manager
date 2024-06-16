import { cn } from "@utils";
import styles from "./index.module.css";
import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean;
  none?: boolean;
  w100?: boolean;
  h100?: boolean;
  hidden?: boolean;
  hiddenX?: boolean;
  overlay?: boolean;
  scroll?: boolean;
  stableGutter?: boolean;
  auto?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

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
  scroll,
  style,
  className,
  children,
  ...rest
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
          [styles.scroll]: scroll,
          [styles.none]: none,
          [styles.hidden]: hidden,
          [styles.hiddenX]: hiddenX,
          [styles.auto]: auto,
          [styles.stableGutter]: stableGutter,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
