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
  defaultValue?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: never;
};

export const Toggle: React.FC<Props> = ({
  data,
  style,
  id,
  name,
  hidden,
  error,
  className,
  defaultValue,
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
          defaultValue={defaultValue}
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
