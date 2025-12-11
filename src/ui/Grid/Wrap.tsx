import { cn } from "@utils/styles";
import { MouseEventHandler, ReactNode } from "react";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	gap?: string | number;
	full?: boolean;
	w100?: boolean;
	h100?: boolean;
	center?: boolean;
	justifyCenter?: boolean;
	alignCenter?: boolean;
	className?: string;
	templateColumns?: string;
	templateRows?: string;
	templateAreas?: string;
	// autoFlow?: string;
	area?: string;
	style?: React.CSSProperties;
	onClick?: MouseEventHandler<HTMLDivElement>;
	children?: ReactNode;
}

const Wrap: React.FC<Props> = ({
	gap,
	full,
	w100,
	h100,
	center,
	justifyCenter,
	alignCenter,
	templateColumns,
	templateRows,
	templateAreas,
	// autoFlow,
	area,
	onClick,
	className,
	style,
	children,
	...rest
}) => {
	return (
		<div
			onClick={onClick}
			style={
				{
					["--grid-gap"]: gap && `${gap}px`,
					["--grid-template-areas"]: templateAreas,
					["--grid-template-columns"]: templateColumns,
					["--grid-template-rows"]: templateRows,
					["--grid-area"]: area,
					// ["--grid-autoflow"]: autoFlow,
					...style,
				} as React.CSSProperties
			}
			className={cn(
				styles.grid,
				{
					full,
					w100,
					h100,
					[styles.gridFull]: full,
					[styles.gridAlignCenter]: alignCenter,
					[styles.gridJustifyCenter]: justifyCenter,
					[styles.gridCenter]: center,
					[styles.gridArea]: area,
					[styles.gridTemplateAreas]: templateAreas,
					[styles.gridTemplateColumns]: templateColumns,
					[styles.gridTemplateRows]: templateRows,
					[styles.gridGap]: gap,
					// [styles.gridAutoflow]: autoFlow,
				},
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Wrap;
