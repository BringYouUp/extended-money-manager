import { cn } from "@utils";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  size?: number;
  name: string;
  fill?: string;
  style?: React.CSSProperties;
  className?: string;
}

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
          "--fill": fill || "currentColor",
          "--icon-size": `${size}px` || "24px",
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
