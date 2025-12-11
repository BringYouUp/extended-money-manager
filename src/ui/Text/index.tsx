import { cn } from "@utils/styles";
import styles from "./index.module.css";

type Props = {
	size?: number;
	secondary?: boolean;
	weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	color?: string;
	block?: boolean;
	uppercase?: boolean;
	center?: boolean;
	right?: boolean;
	ellipsis?: boolean;
	clickable?: boolean;
	className?: string;
	style?: React.CSSProperties;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "a";
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export const Text: React.FC<Props> = ({
	as: Wrapper = "span",
	size,
	color,
	block,
	uppercase,
	clickable,
	center,
	right,
	ellipsis,
	weight,
	style,
	className,
	secondary,
	onClick,
	children,
	...rest
}) => {
	return (
		<Wrapper
			style={
				{
					"--text-size": size && `${size}px`,
					"--text-color": color && color,
					"--text-weight": weight && weight,
					...style,
				} as React.CSSProperties
			}
			className={cn(
				styles.text,
				{
					[styles.block]: block,
					[styles.center]: center,
					[styles.right]: right,
					[styles.uppercase]: uppercase,
					[styles.weight]: weight,
					[styles.color]: color,
					[styles.size]: size,
					[styles.clickable]: clickable,
					[styles.ellipsis]: ellipsis,
					[styles.secondary]: secondary,
				},
				className,
			)}
			onClick={onClick}
			{...rest}
		>
			{children}
		</Wrapper>
	);
};
