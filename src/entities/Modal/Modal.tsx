import { Flex } from "@ui";
import { cn } from "@utils/styles";
import { MouseEvent, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import Components from "./components";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	isOpened: boolean;
	onClose: (e: MouseEvent<HTMLDivElement>) => void;
	children?: ReactNode;
}

const Wrap: React.FC<Props> = ({ isOpened, onClose, children, ...rest }) => {
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
						className={cn(styles.modalWrapper, {
							[styles.modalWrapperEntering]: state === "entering",
							[styles.modalWrapperEntered]: state === "entered",
							[styles.modalWrapperExiting]: state === "exiting",
							[styles.modalWrapperExited]: state === "exited",
						})}
					/>
				)}
			</Transition>

			<Transition in={isOpened} nodeRef={nodeRef} timeout={0} mountOnEnter>
				{(state) => (
					<Flex
						ref={nodeRef}
						full
						center
						onClick={onCloseInner}
						className={cn(styles.modal, {
							[styles.modalEntering]: state === "entering",
							[styles.modalEntered]: state === "entered",
							[styles.modalExiting]: state === "exiting",
							[styles.modalExited]: state === "exited",
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

export function Modal(props: Props) {
	const el = document.getElementById("layers") as HTMLElement;
	return createPortal(<Wrap {...props} />, el);
}

Modal.Wrapper = Components.ModalWrapper;
Modal.Container = Components.ModalContainer;
Modal.Top = Components.ModalTop;
Modal.Title = Components.ModalTitle;
Modal.Subtitle = Components.ModalSubtitle;
Modal.Actions = Components.ModalActions;
