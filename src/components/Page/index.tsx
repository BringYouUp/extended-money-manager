import { CSSProperties, ReactNode } from "react";
import "./index.css";

export const Page = ({
  style,
  children,
}: {
  style: CSSProperties;
  children: ReactNode;
}) => (
  <div style={style} className="page">
    {children}
  </div>
);
