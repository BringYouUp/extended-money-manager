import { cn } from "@utils/styles";
import styles from "./index.module.css";

export const Button: React.FC<Components.Button.Props> = ({
	disabled,
	rounded,
	_role,
	type,
	width,
	active,
	style,
	theme,
	centered = true,
	className = "",
	children,
	...rest
}) => {
	return (
		<button
			style={
				{
					"--button-width": width && width,
					...style,
				} as React.CSSProperties
			}
			className={cn(
				styles.button,
				{
					[styles.width]: width,
					disabled,
					[styles.rounded]: rounded,
					[styles[theme]]: theme,
					[styles[_role || ""]]: _role,
					[styles.active]: active,
					[styles.centered]: centered,
				},
				className,
			)}
			disabled={disabled}
			type={type}
			{...rest}
		>
			{children}
		</button>
	);
};
