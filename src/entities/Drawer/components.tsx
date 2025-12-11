import { Button, Container, Icon, Offset, Text } from "@ui";

const DrawerContainer = ({
	width = "300px",
	children,
}: {
	width?: `${string}${"px"}`;
	children: React.ReactNode;
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
	children: React.ReactNode;
}) => {
	return (
		<Text as="h3" uppercase={uppercase}>
			{children}
		</Text>
	);
};

const DrawerContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<Offset h100 padding={[24, 16]}>
			{children}
		</Offset>
	);
};

const DrawerClose = ({ onClose }: { onClose: () => void }) => {
	return (
		<Button theme="transparent" rounded onClick={onClose}>
			<Icon name="close" />
		</Button>
	);
};

export default {
	DrawerContainer,
	DrawerTitle,
	DrawerContent,
	DrawerClose,
};
