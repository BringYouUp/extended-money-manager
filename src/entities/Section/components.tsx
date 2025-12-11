import { Button, Flex, Icon, Text } from "@ui";
import { cn } from "@utils/styles";

const Container = ({
	medium,
	children,
}: {
	medium?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<Flex
			className={cn("containerBlock", {
				"containerBlock--medium": medium,
			})}
		>
			{children}
		</Flex>
	);
};

const Top = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex gap={12} alignCenter justifyBetween>
			{children}
		</Flex>
	);
};

const Title = ({ children }: { children: React.ReactNode }) => {
	return (
		<Text color="var(--text-color-70)" as="h2" uppercase>
			<Flex alignCenter gap={10}>
				{children}
			</Flex>
		</Text>
	);
};

const SectionIcon = ({
	onClick,
	name,
}: {
	name: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
	return onClick ? (
		<Button theme="transparent" rounded onClick={onClick}>
			<Icon name={name} size={24} fill="var(--text-color-50)" />
		</Button>
	) : (
		<Icon name={name} size={24} />
	);
};

const Content = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default {
	Container,
	Top,
	Title,
	SectionIcon,
	Content,
};
