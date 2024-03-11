import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

type Props = {
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

const Label: React.FC<Props> = ({ htmlFor, style, className, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={style}
      className={cn(styles.label, {}, className)}
    >
      {children}
    </label>
  );
};

export default Label;
