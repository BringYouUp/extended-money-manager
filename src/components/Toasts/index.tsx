import { Flex, Toast } from "@components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { TOAST_SLICE } from "@slices";
import { cn } from "@utils";
import { createPortal } from "react-dom";

import styles from "./index.module.css";

const Component = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);

  const removeToastHandler = (toast: Store.Toast) => () => {
    dispatch(TOAST_SLICE.removeToast(toast));
  };

  return toasts.length ? (
    <Flex
      columnReverse
      gap={12}
      className={cn(styles.toastList)}
      aria-live="assertive"
    >
      {toasts.map((toast) => {
        return (
          <Toast
            key={toast.id}
            data={toast}
            onClose={removeToastHandler(toast)}
          />
        );
      })}
    </Flex>
  ) : null;
};

export function Toasts() {
  const el = document.getElementById("layers") as HTMLElement;
  return createPortal(<Component />, el);
}
