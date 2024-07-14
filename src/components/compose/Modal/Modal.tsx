import { Flex, Transitioned } from "@components";
import { cn } from "@utils";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import Components from "./components";
import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpened: boolean;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
}

const Wrap: React.FC<Props> = ({ isOpened, onClose, children, ...rest }) => {
  const onCloseInner = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      typeof onClose === "function" && onClose(e);
    }
  };

  return (
    <>
      <Transitioned
        _is={isOpened}
        classes={{
          default: styles.modalWrapper,
          enter: styles.modalWrapperEnter,
          exit: styles.modalWrapperExit,
        }}
      >
        <Flex full onClick={onCloseInner}></Flex>
      </Transitioned>
      <Transitioned
        _is={isOpened}
        classes={{
          default: cn(styles.modal),
          enter: styles.modalEnter,
          exit: styles.modalExit,
        }}
        {...rest}
      >
        <Flex full center onClick={onCloseInner}>
          {children}
        </Flex>
      </Transitioned>
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
