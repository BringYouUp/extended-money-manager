import { Flex } from "@ui";
import { cn } from "@utils/styles";
import { MouseEvent, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import Components from "./components";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	side: "left" | "right";
	isOpened: boolean;
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	children?: ReactNode;
}

const Wrap: React.FC<Props> = ({
	side,
	isOpened,
	onClose,
	children,
	...rest
}) => {
	const nodeRef = useRef(null);
	const wrapperRef = useRef(null);

	const onCloseInner = (e: MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			typeof onClose === "function" && onClose(e);
		}
	};

	return (
		<>
			<Transition in={isOpened} nodeRef={wrapperRef} mountOnEnter timeout={0}>
				{(state) => (
					<Flex
						ref={wrapperRef}
						full
						onClick={onCloseInner}
						className={cn(styles.drawerWrapper, {
							[styles.drawerWrapperEntering]: state === "entering",
							[styles.drawerWrapperEntered]: state === "entered",
							[styles.drawerWrapperExiting]: state === "exiting",
							[styles.drawerWrapperExited]: state === "exited",
						})}
					/>
				)}
			</Transition>

			<Transition in={isOpened} nodeRef={nodeRef} timeout={0} mountOnEnter>
				{(state) => (
					<Flex
						ref={nodeRef}
						full
						onClick={onCloseInner}
						className={cn(styles.drawer, styles[side], {
							[styles.drawerEntering]: state === "entering",
							[styles.drawerEntered]: state === "entered",
							[styles.drawerExiting]: state === "exiting",
							[styles.drawerExited]: state === "exited",
						})}
						{...rest}
					>
						{children}
					</Flex>
				)}
			</Transition>
		</>
	);
};

export function Drawer(props: Props) {
	const el = document.getElementById("layers") as HTMLElement;
	return createPortal(<Wrap {...props} />, el);
}

Drawer.Container = Components.DrawerContainer;
Drawer.Title = Components.DrawerTitle;
Drawer.Content = Components.DrawerContent;
Drawer.Close = Components.DrawerClose;
