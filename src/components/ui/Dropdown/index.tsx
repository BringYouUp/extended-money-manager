import styles from "./index.module.css";

import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Flex, Transitioned } from "@components";
import { createPortal } from "react-dom";

type Props = {
  buttonRef: React.RefObject<HTMLElement>;
  isOpened: boolean;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Wrap: React.FC<Props> = ({
  buttonRef,
  style,
  className,
  isOpened,
  onClose,
  children,
}) => {
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

  // console.log("→ RENDER", position);

  return (
    <>
      <Transitioned
        is={isOpened && Boolean(position.left && position.top)}
        classes={{
          default: styles.dropdownWrapper,
          enter: styles.dropdownWrapperEnter,
          exit: styles.dropdownWrapperExit,
        }}
      >
        <Flex full onClick={onCloseInner}></Flex>
      </Transitioned>
      <Transitioned
        is={isOpened && Boolean(position.left && position.top)}
        classes={{
          default: styles.dropdown,
          enter: styles.dropdownEnter,
          exit: styles.dropdownExit,
        }}
        style={{
          left: position.left + "px",
          top: position.top + "px",
          ...style,
        }}
        className={className}
      >
        <div className={styles.dropdownInner}>{children}</div>
      </Transitioned>
    </>
  );
};

export function Dropdown(props: Props) {
  const el = document.getElementById("layers") as HTMLElement;
  return createPortal(<Wrap {...props} />, el);
}
