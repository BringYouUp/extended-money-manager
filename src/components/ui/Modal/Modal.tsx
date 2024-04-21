import styles from "./index.module.css";

import { MouseEvent, ReactNode } from "react";
import { Flex, Transitioned } from "@components";
import { cn } from "@utils";
import { createPortal } from "react-dom";

type Props = {
  isOpened: boolean;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
};

const Wrap: React.FC<Props> = ({ isOpened, onClose, children }) => {
  const onCloseInner = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      typeof onClose === "function" && onClose(e);
    }
  };

  return (
    <>
      <Transitioned
        is={isOpened}
        classes={{
          default: styles.modalWrapper,
          enter: styles.modalWrapperEnter,
          exit: styles.modalWrapperExit,
        }}
      >
        <Flex full onClick={onCloseInner}></Flex>
      </Transitioned>
      <Transitioned
        is={isOpened}
        classes={{
          default: cn(styles.modal),
          enter: styles.modalEnter,
          exit: styles.modalExit,
        }}
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
