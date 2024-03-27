import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

enum Themes {
  primary = "primary",
  outline = "outline",
  transparent = "transparent",
}

type Props = {
  disabled?: boolean;
  rounded?: boolean;
  active?: boolean;
  theme: keyof typeof Themes;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

export const Button: React.FC<Props> = ({
  disabled,
  rounded,
  type,
  onClick,
  width,
  active,
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
          [styles.width]: width,
          [styles.disabled]: disabled,
          [styles.rounded]: rounded,
          [styles.primary]: theme === Themes.primary,
          [styles.outline]: theme === Themes.outline,
          [styles.transparent]: theme === Themes.transparent,
          [styles.active]: active,
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
