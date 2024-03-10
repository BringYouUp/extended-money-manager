import styles from "./index.module.css";

import { cn } from "../../../utils";
import { ReactNode } from "react";

type Props = {
  padding?: number[];
  margin?: number[];
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
};

const generateOffsetStyle = (values: number[]) => {
  switch (values.length) {
    case 0:
      return `0px`;
    case 1:
      return `${values[0]}px`;
    case 2:
      return `${values[0]}px ${values[1]}px`;
    case 3:
      return `{values[0]}px ${values[1]}px ${values[2]}px`;
    default:
      return `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
  }
};

const Offset: React.FC<Props> = ({
  padding,
  margin,
  style,
  className,
  children,
}) => {
  return (
    <div
      style={
        {
          "--offset-padding": padding && generateOffsetStyle(padding),
          "--offset-margin": margin && generateOffsetStyle(margin),
          ...style,
        } as React.CSSProperties
      }
      className={cn(styles.offset, {}, className)}
    >
      {children}
    </div>
  );
};

export default Offset;
