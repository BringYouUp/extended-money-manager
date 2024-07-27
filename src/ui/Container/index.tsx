import { ReactNode } from "react";

import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean;
  w100?: boolean;
  h100?: boolean;
  width?: `${string}${"px"}`;
  // height?: `${string}${"px"}`;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  children?: ReactNode;
}

export const Container: React.FC<Props> = ({
  full,
  w100,
  h100,
  width,
  background,
  style,
  className = "",
  children,
  ...rest
}) => {
  return (
    <div
      style={
        {
          "--container-width": width && width,
          // "--container-height": height && height,
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
          // [styles.height]: height,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
