import { Flex } from "@ui";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}
export function FormItems({ style, className, children, ...rest }: Props) {
	return (
		<Flex w100 column gap={20} style={style} className={className} {...rest}>
			{children}
		</Flex>
	);
}
