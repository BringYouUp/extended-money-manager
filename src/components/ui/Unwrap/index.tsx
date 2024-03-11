import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

type Props = {
  className?: string;
  visible: boolean;
  negativeOffset: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

const Unwrap: React.FC<Props> = ({
  visible,
  negativeOffset,
  style,
  children,
}) => {
  return (
    <div
      style={
        {
          "--unwrap-negative-offset": negativeOffset,
          ...style,
        } as React.CSSProperties
      }
      className={cn(styles.unwrap, {
        [styles.visible]: visible,
      })}
    >
      {children}
    </div>
  );
};

export default Unwrap;
