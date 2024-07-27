import { Button, Container, Flex, Icon, Text } from "..";

import { cn } from "@utils/styles";
import { ReactNode } from "react";
import { ICONS_FILL_MAP, ICONS_NAME_MAP } from "./consts";
import styles from "./index.module.css";

const Wrapper = ({
  type,
  style,
  className,
  children,
}: {
  type: Store.ToastType;
  style?: React.CSSProperties;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      style={style}
      className={cn(
        styles.toast,
        {
          [styles[type]]: type,
        },
        className
      )}
      gap={8}
    >
      {children}
    </Flex>
  );
};

const ToastIcon = ({ type }: { type: Store.ToastType }) => {
  return (
    <Icon size={16} name={ICONS_NAME_MAP[type]} fill={ICONS_FILL_MAP[type]} />
  );
};

const Left = ({ children }: { children: ReactNode }) => {
  return (
    <Container width="16px">
      <Flex full center>
        {children}
      </Flex>
    </Container>
  );
};

const Right = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const Center = ({ children }: { children: ReactNode }) => {
  return (
    <Flex flex1 column gap={4}>
      {children}
    </Flex>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <Text uppercase as="h4" weight={500} secondary>
      {children}
    </Text>
  );
};

const Description = ({ children }: { children: ReactNode }) => {
  return (
    <Text className={styles.description} size={12} secondary as="span">
      {children}
    </Text>
  );
};

const Close = ({ onClose }: { onClose: () => void }) => {
  return (
    <Button
      className={styles.close}
      theme="transparent"
      rounded
      onClick={onClose}
    >
      <Icon size={16} name="close" />
    </Button>
  );
};

export default {
  Wrapper,
  Icon: ToastIcon,
  Left,
  Right,
  Close,
  Center,
  Title,
  Description,
};
