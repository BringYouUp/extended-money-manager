import { ReactNode } from "react";
import { Container, Flex, Offset, Text } from "../../ui";

const ModalWrapper = ({
  style,
  className,
  children,
}: {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <Container
      style={style}
      className={className}
      background="var(--soft-background-color)"
      width="300px"
    >
      <Offset padding={[24, 16]}>
        <Flex column gap={16}>
          {children}
        </Flex>
      </Offset>
    </Container>
  );
};

const ModalContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Flex column gap={24}>
      {children}
    </Flex>
  );
};

const ModalTop = ({ children }: { children: ReactNode }) => {
  return (
    <Flex column gap={12}>
      {children}
    </Flex>
  );
};

const ModalTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Text as="h3" uppercase>
      {children}
    </Text>
  );
};

const ModalSubtitle = ({ children }: { children: ReactNode }) => {
  return <Text>{children}</Text>;
};

export default {
  ModalWrapper,
  ModalContainer,
  ModalTop,
  ModalTitle,
  ModalSubtitle,
};
