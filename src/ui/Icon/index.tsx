import { cn } from "@utils/styles";
import styles from "./index.module.css";

const SPRITE_URL = `/assets/sprite.svg?v${__LAST_BUILD_AT__}`;

interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
	size?: number;
	name: string;
	fill?: string;
	style?: React.CSSProperties;
	className?: string;
}

export const Icon: React.FC<Props> = ({
	size = 16,
	name,
	fill,
	className,
	style,
	...rest
}) => {
	return (
		<svg
			width={size}
			height={size}
			style={
				{
					"--fill": fill || "currentColor",
					"--icon-size": `${size}px` || "16px",
					minWidth: "var(--icon-size)",
					minHeight: "var(--icon-size)",
					...style,
				} as React.CSSProperties
			}
			className={cn(styles.icon, className, {}, className)}
			fill={fill || "var(--text-color)"}
			{...rest}
		>
			<use href={`${SPRITE_URL}#icon-${name}`} />
		</svg>
	);
};
