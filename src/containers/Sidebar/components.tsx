import { Button, Icon, Text } from "@components";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const Link = ({ children, path }: { path: string; children: ReactNode }) => {
  return <NavLink to={path}>{children}</NavLink>;
};

const SidebarLabel = ({ children }: { children: ReactNode }) => (
  <Text uppercase>{children}</Text>
);

const SidebarIcon = ({ name }: { name: string }) => (
  <Icon size={24} name={name} />
);

type SidebarButton = {
  onClick?: Components.Button.Props["onClick"];
  active?: boolean;
  rounded?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
};

const SidebarButton = ({
  onClick,
  rounded,
  active,
  children,
  style = {},
}: SidebarButton) => {
  return (
    <Button
      onClick={onClick}
      centered={false}
      style={{ width: "100%", ...style }}
      active={active}
      theme="transparent"
      rounded={rounded}
    >
      {children}
    </Button>
  );
};

export default {
  Link,
  Button: SidebarButton,
  Label: SidebarLabel,
  Icon: SidebarIcon,
};
