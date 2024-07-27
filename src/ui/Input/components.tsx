import { cn } from "@utils/styles";

import { ReactNode } from "react";
import styles from "./index.module.css";

const Wrapper = ({
  style,
  error,
  hidden,
  className,
  children,
}: Pick<Components.Input.Props, "style" | "error" | "hidden" | "className"> & {
  children: ReactNode;
}) => {
  return (
    <div
      style={style}
      className={cn(
        styles.input,
        {
          [styles.error]: error,
          [styles.hidden]: hidden,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

const Input = ({
  id,
  name,
  type = "text",
  defaultValue,
  placeholder,
  ...rest
}: Components.Input.Props & React.HTMLProps<HTMLInputElement>) => {
  return (
    <input
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default { Wrapper, Input };
