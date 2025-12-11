import { Button, Icon, Text } from "@ui";
import NavLink from "next/link";

const Link = ({
	children,
	path,
}: {
	path: string;
	children: React.ReactNode;
}) => {
	return <NavLink href={path}>{children}</NavLink>;
};

const SidebarLabel = ({ children }: { children: React.ReactNode }) => (
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
	children: React.ReactNode;
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
