import { cn } from "@utils";
import styles from "./index.module.css";

type Props = {
  size: number;
  color?: string;
  // style?: any,
  children?: never;
};

const Spinner: React.FC<Props> = ({ size, color }) => {
  return (
    <div
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-color": color || "currentColor",
        } as React.CSSProperties
      }
      className={cn(styles.spinner)}
    />
  );
};

export default Spinner;
