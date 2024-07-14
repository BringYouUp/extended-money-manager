import { cn } from "@utils";

import styles from "./index.module.css";

export const Input: React.FC<
  Components.Input.Props & React.HTMLProps<HTMLInputElement>
> = ({
  style,
  id,
  name,
  error,
  hidden,
  className,
  type = "text",
  defaultValue,
  placeholder,
  ...rest
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
        className,
      )}
    >
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
};
