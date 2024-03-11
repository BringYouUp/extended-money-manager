import { cn } from "@utils";
import styles from "./index.module.css";

import { ReactNode } from "react";

type Props = {
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: string;
  block?: boolean;
  uppercase?: boolean;
  center?: boolean;
  clickable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "a";
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

const Text: React.FC<Props> = ({
  as: Wrapper = "span",
  size,
  color,
  block,
  uppercase,
  clickable,
  center,
  weight,
  style,
  className,
  onClick,
  children,
}) => {
  return (
    <Wrapper
      style={
        {
          "--text-size": size && `${size}px`,
          "--text-color": color && color,
          "--text-weight": weight && weight,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.text,
        {
          [styles.block]: block,
          [styles.center]: center,
          [styles.uppercase]: uppercase,
          [styles.weight]: weight,
          [styles.color]: color,
          [styles.size]: size,
          [styles.clickable]: clickable,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

export default Text;
