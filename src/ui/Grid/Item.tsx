import { MouseEventHandler, ReactNode } from "react";

import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string | number;
  full?: boolean;
  w100?: boolean;
  h100?: boolean;
  center?: boolean;
  area?: string;
  justifySelf?: boolean;
  alignSelf?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: ReactNode;
}

const Item: React.FC<Props> = ({
  gap,
  full,
  w100,
  h100,
  center,
  justifySelf,
  alignSelf,
  area,
  onClick,
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      onClick={onClick}
      style={
        {
          ["--grid-item-area"]: area && area,
          ["--grid-item-gap"]: gap && `${gap}px`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.gridItem,
        {
          full,
          w100,
          h100,
          ["el-grid-item-align-self"]: alignSelf,
          ["el-grid-item-justify-self"]: justifySelf,
          ["el-grid-item-center-self"]: center,
          ["el-grid-item-area"]: area,
          ["el-grid-item-gap"]: Number.isInteger(gap),
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Item;
