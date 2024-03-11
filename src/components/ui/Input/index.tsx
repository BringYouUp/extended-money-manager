import { cn } from "@utils";
import styles from "./index.module.css";

type Props = {
  id?: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: never;
};

const Input: React.FC<Props> = ({
  style,
  id,
  name,
  className,
  type = "text",
  defaultValue,
  placeholder,
}) => {
  return (
    <div style={style} className={cn(styles.input, {}, className)}>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
