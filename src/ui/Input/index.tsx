"use client";

import { cn } from "@utils/styles";
import { useState } from "react";
import { Icon } from "../Icon";
import Components from "./components";
import styles from "./index.module.css";

export function Input({
	style,
	id,
	name,
	error,
	hidden,
	className,
	type,
	defaultValue,
	placeholder,
	RightIcon,
	...rest
}: Components.Input.Props & React.HTMLProps<HTMLInputElement>) {
	return (
		<Input.Wrapper
			style={style}
			className={className}
			hidden={hidden}
			error={error}
		>
			<Input.Input
				id={id}
				name={name}
				placeholder={placeholder}
				type={type}
				defaultValue={defaultValue}
				{...rest}
			/>
		</Input.Wrapper>
	);
}

const Password = ({
	style,
	id,
	name,
	error,
	hidden,
	className,
	defaultValue,
	placeholder = "Enter password...",
	RightIcon,
	type,
	...rest
}: Components.Input.Props & React.HTMLProps<HTMLInputElement>) => {
	const [isVisible, setVisible] = useState(false);

	const onToggle = () => setVisible((prev) => !prev);

	return (
		<Input.Wrapper
			style={style}
			className={className}
			hidden={hidden}
			error={error}
		>
			<Input.Input
				id={id}
				name={name}
				placeholder={placeholder}
				type={isVisible ? "text" : "password"}
				defaultValue={defaultValue}
				className={styles.withRightIcon}
				{...rest}
			/>
			<Icon
				className={cn("pointer", styles.inputIcon)}
				onClick={() => onToggle()}
				name={isVisible ? "eye" : "eye-close"}
				size={20}
				fill="var(--text-color-60)"
			/>
		</Input.Wrapper>
	);
};

Input.Wrapper = Components.Wrapper;
Input.Input = Components.Input;
Input.Password = Password;
