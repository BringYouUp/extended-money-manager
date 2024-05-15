import { cn } from "@utils";
import styles from "./index.module.css";
import { Flex, FormGroup, Text } from "@components";

type Props = {
  id?: string;
  data: {
    label: string;
    value: string;
  }[];
  name: string;
  error?: boolean;
  hidden?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: never;
  checked?: boolean;
  defaultValue?: boolean;
};

export const RadioGroup: React.FC<Props> = ({
  data,
  style,
  name,
  hidden,
  error,
  className,
}) => {
  return (
    <FormGroup
      style={{
        height: "34px",
        ...style,
      }}
      error={error}
      className={cn(
        styles.group,
        {
          [styles.hidden]: hidden,
        },
        className
      )}
    >
      <Flex w100 h100 gap={4} alignCenter>
        {data.map((item) => {
          return (
            <Flex key={item.value} flex1 h100 center>
              <input
                type="radio"
                className={cn(styles.hidden)}
                name={name}
                id={item.value}
                defaultValue={item.value}
              />
              <label className={styles.label} htmlFor={item.value}>
                <Flex w100 h100 center>
                  <Text>{item.label}</Text>
                </Flex>
              </label>
            </Flex>
          );
        })}
      </Flex>
    </FormGroup>
  );
};
