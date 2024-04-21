import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

enum Themes {
  primary = "primary",
  outline = "outline",
  option = "option",
  transparent = "transparent",
}

type Props = {
  disabled?: boolean;
  rounded?: boolean;
  centered?: boolean;
  active?: boolean;
  theme: keyof typeof Themes;
  type?: "button" | "reset" | "submit" | undefined;
  role?: "warning" | "success" | "error";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
};

export const Button: React.FC<Props> = ({
  disabled,
  rounded,
  role,
  type,
  onClick,
  width,
  active,
  style,
  theme,
  centered = true,
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
          disabled,
          [styles.rounded]: rounded,
          [styles[theme]]: theme,
          [styles[role || ""]]: role,
          [styles.active]: active,
          [styles.centered]: centered,
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
