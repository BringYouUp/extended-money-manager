import { cn } from "@utils";
import { ReactNode } from "react";

import styles from "./index.module.css";

enum Themes {
  primary = "primary",
  outline = "outline",
  option = "option",
  transparent = "transparent",
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  rounded?: boolean;
  centered?: boolean;
  active?: boolean;
  theme: keyof typeof Themes;
  type?: "button" | "reset" | "submit" | undefined;
  _role?: "warning" | "success" | "error";
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const Button: React.FC<Props> = ({
  disabled,
  rounded,
  _role,
  type,
  width,
  active,
  style,
  theme,
  centered = true,
  className = "",
  children,
  ...rest
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
          disabled,
          [styles.rounded]: rounded,
          [styles[theme]]: theme,
          [styles[_role || ""]]: _role,
          [styles.active]: active,
          [styles.centered]: centered,
        },
        className,
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
