import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

enum Themes {
  primary = "primary",
  outline = "outline",
  transparent = "transparent",
}

type Props = {
  fullW?: boolean;
  disabled?: boolean;
  theme: keyof typeof Themes;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

const Button: React.FC<Props> = ({
  fullW,
  disabled,
  type,
  onClick,
  width,
  style,
  theme,
  className = "",
  children,
}) => {
  return (
    <button
      style={
        {
          "--button-width": width && width,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.button,
        {
          ["full-w"]: fullW,
          [styles.width]: width,
          [styles.disabled]: disabled,
          [styles.primary]: theme === Themes.primary,
          [styles.outline]: theme === Themes.outline,
          [styles.transparent]: theme === Themes.transparent,
        },
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
