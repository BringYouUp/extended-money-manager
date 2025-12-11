import { Flex, Icon, Text } from "@ui";
import { cn } from "@utils/styles";
import { MouseEventHandler, ReactNode } from "react";
import styles from "./index.module.css";

const CategoryIcon = ({
	deleted,
	icon,
}: {
	deleted?: boolean;
	icon: string;
}) => {
	return deleted ? (
		<Icon size={24} fill="var(--text-color-white-90)" name="trash" />
	) : (
		<Icon size={24} fill="var(--text-color-white-90)" name={icon} />
	);
};

const CategoryInfo = ({ name }: { name: string }) => {
	return (
		<Text
			ellipsis
			weight={600}
			color="var(--text-color-white-90)"
			className={cn(styles.label)}
		>
			{name ? name : <Text color="var(--text-color-white-50)">Name...</Text>}
		</Text>
	);
};

const CategoryCard = ({
	selected,
	onClick,
	style,
	children,
	color,
	deleted,
	type,
	empty,
}: {
	style?: React.CSSProperties;
	noClick?: boolean;
	empty?: boolean;
	selected?: boolean;
	deleted?: boolean;
	color: string;
	type?: Store.CategoryType;
	onClick?: MouseEventHandler<HTMLDivElement> | ((e: unknown) => void);
	children: ReactNode;
}) => {
	return (
		<Flex
			style={
				{
					"--category-color": color,
					...style,
				} as React.CSSProperties
			}
			className={cn(styles.category, {
				[styles.selected]: selected,
				[styles.deleted]: deleted,
				[styles.empty]: empty,
				[styles[type || ""]]: type,
			})}
			alignCenter
			onClick={onClick}
		>
			<Flex gap={6} className={styles.container} alignCenter>
				{children}
			</Flex>
		</Flex>
	);
};

export default {
	CategoryIcon,
	CategoryInfo,
	CategoryCard,
};
