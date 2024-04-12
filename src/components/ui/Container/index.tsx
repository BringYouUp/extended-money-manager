import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

type Props = {
  full?: boolean;
  w100?: boolean;
  h100?: boolean;
  width?: string;
  height?: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  children?: ReactNode;
};

export const Container: React.FC<Props> = ({
  full,
  w100,
  h100,
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
        styles.container,
        {
          full,
          w100,
          h100,
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
