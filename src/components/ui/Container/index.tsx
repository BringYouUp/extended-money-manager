import styles from "./index.module.css";

import { cn } from "../../../utils";
import { ReactNode } from "react";

type Props = {
  full?: boolean;
  fullW?: boolean;
  fullH?: boolean;
  width?: string;
  height?: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  children?: ReactNode;
};

const Container: React.FC<Props> = ({
  full = false,
  fullW = false,
  fullH = false,
  width,
  height,
  background,
  style,
  className = "",
  children,
}) => {
  return (
    <div
      style={
        {
          "--container-width": width && width,
          "--container-height": height && height,
          "--container-background": background && background,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.flex,
        {
          full: full,
          ["full-w"]: fullW,
          ["full-h"]: fullH,
          [styles.background]: background,
          [styles.width]: width,
          [styles.height]: height,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
