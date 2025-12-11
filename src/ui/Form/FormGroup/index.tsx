import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	error?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export const FormGroup: React.FC<Props> = ({
	error,
	style,
	className,
	children,
	...rest
}) => {
	return (
		<div
			style={style}
			className={cn(
				styles.formGroup,
				{
					[styles.error]: error,
				},
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
};
