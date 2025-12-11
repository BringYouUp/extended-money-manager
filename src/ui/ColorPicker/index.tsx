"use client";

import { cn } from "@utils/styles";
import { useEffect, useState } from "react";
import { FormGroup } from "../Form";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	value?: string;
	id?: string;
	name?: string;
	className?: string;
	error?: boolean;
	onValueChange?: (value: string) => void;
	style?: React.CSSProperties;
}

export const ColorPicker: React.FC<Props> = ({
	value: defaultValue,
	onValueChange,
	style,
	error,
	id,
	name,
	className = "",
	...rest
}) => {
	const [value, setValue] = useState(defaultValue || "");

	useEffect(() => {
		typeof onValueChange === "function" && onValueChange(value);
	}, [value]);

	return (
		<FormGroup
			style={style}
			className={cn(styles.container, { [styles.error]: error }, className)}
			{...rest}
		>
			<input
				id={id}
				name={name}
				style={
					{
						"--hue": value,
					} as React.CSSProperties
				}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type="range"
				min="0"
				max="360"
				step="1"
			></input>
		</FormGroup>
	);
};
