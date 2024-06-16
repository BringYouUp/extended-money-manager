import { cn } from "@utils";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  color?: string;
  // style?: any,
  children?: never;
}

export const Spinner: React.FC<Props> = ({ size, color, ...rest }) => {
  return (
    <div
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-color": color || "currentColor",
        } as React.CSSProperties
      }
      className={cn(styles.spinner)}
      {...rest}
    />
  );
};
