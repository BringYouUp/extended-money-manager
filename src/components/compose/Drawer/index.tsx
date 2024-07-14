import { Flex, Transitioned } from "@components";
import { cn } from "@utils";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { TransitionedPropsClasses } from "src/components/Transitioned";

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
  const onCloseInner = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      typeof onClose === "function" && onClose(e);
    }
  };

  const defineStyles = {
    left: {
      default: cn(styles.drawer, styles.left),
      enter: styles.drawerEnter,
      exit: styles.drawerExit,
    },
    right: {
      default: cn(styles.drawer, styles.right),
      enter: styles.drawerEnter,
      exit: styles.drawerExit,
    },
  };

  return (
    <>
      <Transitioned
        _is={isOpened}
        classes={{
          default: styles.drawerWrapper,
          enter: styles.drawerWrapperEnter,
          exit: styles.drawerWrapperExit,
        }}
      >
        <Flex full onClick={onCloseInner}></Flex>
      </Transitioned>
      <Transitioned
        _is={isOpened}
        classes={defineStyles[side] as TransitionedPropsClasses}
        {...rest}
      >
        <Flex full onClick={onCloseInner}>
          {children}
        </Flex>
      </Transitioned>
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
