import { cn } from "@utils";
import styles from "./index.module.css";

import { useEffect, useState } from "react";
import { FormGroup } from "@components";

type Props = {
  value?: string;
  id?: string;
  name?: string;
  className?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
};

export const ColorPicker: React.FC<Props> = ({
  value: defaultValue,
  onChange,
  style,
  error,
  id,
  name,
  className = "",
}) => {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    typeof onChange === "function" && onChange(value);
  }, [value]);

  return (
    <FormGroup
      style={style}
      className={cn(styles.container, { [styles.error]: error }, className)}
    >
      <input
        id={id}
        name={name}
        style={
          {
            "--hue": value,
          } as React.CSSProperties
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="range"
        min="0"
        max="360"
        step="1"
      ></input>
    </FormGroup>
  );
};
