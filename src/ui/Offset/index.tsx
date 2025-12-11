import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	full?: boolean;
	w100?: boolean;
	h100?: boolean;
	padding?: number[];
	margin?: number[];
	style?: React.CSSProperties;
	className?: string;
	children?: React.ReactNode;
}

const generateOffsetStyle = (values: number[]) => {
	switch (values.length) {
		case 0:
			return `0px`;
		case 1:
			return `${values[0]}px`;
		case 2:
			return `${values[0]}px ${values[1]}px`;
		case 3:
			return `${values[0]}px ${values[1]}px ${values[2]}px`;
		default:
			return `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
	}
};

export const Offset: React.FC<Props> = ({
	full,
	w100,
	h100,
	padding,
	margin,
	style,
	className,
	children,
	...rest
}) => {
	return (
		<div
			style={
				{
					"--offset-padding": padding && generateOffsetStyle(padding),
					"--offset-margin": margin && generateOffsetStyle(margin),
					...style,
				} as React.CSSProperties
			}
			className={cn(
				styles.offset,
				{
					full,
					w100,
					h100,
					[styles.padding]: Boolean(padding),
					[styles.margin]: Boolean(margin),
				},
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
};
