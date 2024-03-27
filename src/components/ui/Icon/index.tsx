import { cn } from "@utils";
import styles from "./index.module.css";

type Props = {
  size?: number;
  name: string;
  fill?: string;
  style?: React.CSSProperties;
  className?: string;
};

export const Icon: React.FC<Props> = ({
  size = 14,
  name,
  fill,
  className,
  style,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      style={
        {
          "--fill": fill || "var(--text-color)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(styles.icon, className, {}, className)}
      fill={fill || "var(--text-color)"}
      {...rest}
    >
      <use xlinkHref={`#aicon-${name}`} />
    </svg>
  );
};
