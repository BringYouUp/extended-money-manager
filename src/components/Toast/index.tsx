import { cn } from "@utils";
import styles from "./index.module.css";
import { Button, Container, Flex, Icon, Text } from "@components";

type Props = {
  data: Store.Toast;
  style?: React.CSSProperties;
  className?: string;
  children?: never;
  onClose: () => void;
};

const ICONS_NAME_MAP = {
  success: "check",
  error: "close",
  warning: "warning",
};

const ICONS_FILL_MAP = {
  error: "var(--text-color-error)",
  success: "var(--text-color-success)",
  warning: "var(--text-color-warning)",
};

export const Toast = ({ style, className, data, onClose }: Props) => {
  return (
    <Flex
      style={style}
      className={cn(
        styles.toast,
        {
          [styles[data.type]]: data.type,
        },
        className
      )}
      gap={8}
    >
      <Container width="16px">
        <Flex full center>
          <Icon
            size={16}
            name={ICONS_NAME_MAP[data.type]}
            fill={ICONS_FILL_MAP[data.type]}
          />
        </Flex>
      </Container>
      <Flex w100 column gap={4}>
        <Flex alignStart gap={8} justifyBetween>
          <Text uppercase as="h4" weight={500}>
            {data.title}
          </Text>
          <Button
            className={styles.close}
            theme="transparent"
            rounded
            onClick={onClose}
          >
            <Icon size={16} name="close" />
          </Button>
        </Flex>
        {data.description && (
          <Text className={styles.description} size={12} secondary as="span">
            {data.description}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
