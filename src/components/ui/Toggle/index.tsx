import { cn } from "@utils";
import styles from "./index.module.css";
import { Flex, FormGroup, Text } from "@components";

type Props = {
  id?: string;
  data: {
    checked: {
      label: string;
    };
    unchecked: {
      label: string;
    };
  };
  name: string;
  error?: boolean;
  hidden?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: never;
  checked?: boolean;
  defaultValue?: boolean;
};

export const Toggle: React.FC<Props> = ({
  data,
  style,
  id,
  name,
  hidden,
  error,
  className,
  checked,
}) => {
  return (
    <FormGroup
      style={{
        height: "34px",
        ...style,
      }}
      error={error}
      className={cn(
        styles.checkbox,
        {
          [styles.hidden]: hidden,
        },
        className
      )}
    >
      <label className={cn("flex", "w100", "h100")} htmlFor={name}>
        <input
          checked={checked}
          type="checkbox"
          className={cn(styles.hidden)}
          name={name}
          id={id}
        />
        <Flex className={cn(styles.labelsWrapper)} w100 gap={4} alignCenter>
          <Flex flex1 h100 center className={cn(styles.label)}>
            <Text>{data.unchecked.label}</Text>
          </Flex>
          <Flex flex1 h100 center className={cn(styles.label)}>
            <Text>{data.checked.label}</Text>
          </Flex>
        </Flex>
      </label>
    </FormGroup>
  );
};
