"use client";

import { cn } from "@utils/styles";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import { Flex } from "../Flex";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	buttonRef: React.RefObject<HTMLElement>;
	isOpened: boolean;
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	children?: ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

const Wrap: React.FC<Props> = ({
	buttonRef,
	style,
	className,
	isOpened,
	onClose,
	children,
	...rest
}) => {
	const nodeRef = useRef(null);
	const wrapperRef = useRef(null);

	const [position, setPosition] = useState({ top: 0, left: 0 });
	const onCloseInner = (e: MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			typeof onClose === "function" && onClose(e);
		}
	};

	useEffect(() => {
		if (isOpened && buttonRef.current && !position.left && !position.top) {
			const { top, left, height } = buttonRef.current.getBoundingClientRect();

			setPosition({
				top: top + height,
				left,
			});
		}
	}, [isOpened, position]);

	return (
		<>
			<Transition
				in={isOpened && Boolean(position.left && position.top)}
				nodeRef={wrapperRef}
				mountOnEnter
				timeout={0}
			>
				{(state) => (
					<Flex
						ref={wrapperRef}
						full
						onClick={onCloseInner}
						className={cn(styles.dropdownWrapper, {
							[styles.dropdownWrapperEntering]: state === "entering",
							[styles.dropdownWrapperEntered]: state === "entered",
							[styles.dropdownWrapperExiting]: state === "exiting",
							[styles.dropdownWrapperExited]: state === "exited",
						})}
					/>
				)}
			</Transition>

			<Transition
				in={isOpened && Boolean(position.left && position.top)}
				nodeRef={nodeRef}
				timeout={0}
				mountOnEnter
			>
				{(state) => (
					<div
						ref={nodeRef}
						style={{
							left: position.left + "px",
							top: position.top + "px",
							...style,
						}}
						className={cn(styles.dropdown, {
							[styles.dropdownEntering]: state === "entering",
							[styles.dropdownEntered]: state === "entered",
							[styles.dropdownExiting]: state === "exiting",
							[styles.dropdownExited]: state === "exited",
						})}
						{...rest}
					>
						<div className={styles.dropdownInner}>{children}</div>
					</div>
				)}
			</Transition>
		</>
	);
};

export function Dropdown(props: Props) {
	const el = document.getElementById("layers") as HTMLElement;
	return createPortal(<Wrap {...props} />, el);
}
