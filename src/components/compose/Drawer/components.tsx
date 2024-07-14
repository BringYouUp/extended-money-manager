import { Button, Container, Icon, Offset, Text } from "@components";
import { ReactNode } from "react";

const DrawerContainer = ({
  width = "300px",
  children,
}: {
  width?: `${string}${"px"}`;
  children: ReactNode;
}) => {
  return (
    <Container h100 background="var(--soft-background-color)" width={width}>
      {children}
    </Container>
  );
};

const DrawerTitle = ({
  uppercase = true,
  children,
}: {
  uppercase?: boolean;
  children: ReactNode;
}) => {
  return (
    <Text as="h3" uppercase={uppercase}>
      {children}
    </Text>
  );
};

const DrawerContent = ({ children }: { children: ReactNode }) => {
  return (
    <Offset h100 padding={[24, 16]}>
      {children}
    </Offset>
  );
};

const DrawerClose = ({ onClose }: { onClose: () => void }) => {
  return (
    <Button theme="transparent" rounded onClick={onClose}>
      <Icon size={16} name="close" />
    </Button>
  );
};

export default {
  DrawerContainer,
  DrawerTitle,
  DrawerContent,
  DrawerClose,
};
