import { ReactNode } from "react";
import { Container, Flex, Offset } from "@components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
}

export const ModalWrapper: React.FC<Props> = ({
  style,
  className,
  children,
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
