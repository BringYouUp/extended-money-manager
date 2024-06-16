import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const Label: React.FC<Props> = ({
  htmlFor,
  style,
  className,
  children,
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      style={style}
      className={cn(styles.label, {}, className)}
      {...rest}
    >
      {children}
    </label>
  );
};
