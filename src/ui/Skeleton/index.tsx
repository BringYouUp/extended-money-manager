import { cn } from "@utils/styles";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	style?: React.CSSProperties;
	children?: never;
}

export const Skeleton: React.FC<Props> = ({ style, className, ...rest }) => {
	return (
		<div style={style} className={cn(styles.skeleton, className)} {...rest} />
	);
};
