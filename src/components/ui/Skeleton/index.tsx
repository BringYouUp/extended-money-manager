import { cn } from "@utils";
import styles from "./index.module.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: never;
};

export const Skeleton: React.FC<Props> = ({ style, className }) => {
  return <div style={style} className={cn(styles.skeleton, className)} />;
};
