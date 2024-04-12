import { cn } from "@utils";
import styles from "./index.module.css";
import { Key, ReactNode, useRef } from "react";
import { Dropdown, Flex, Input, Scrollable } from "@components";
import { useModal } from "@hooks";

type Props<T extends object> = {
  selectedCallback: (item: T) => boolean;
  parseItem: (item: T) => React.ReactNode;
  onChange: (item: T) => void;
  items: T[];
  placeholder?: string;
  error?: boolean;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  mode: "single" | "multi";
  Wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
  Component: React.FC<
    {
      data: T;
      selected: boolean;
      onClick: (item: T) => void;
    } & Pick<Props<T>, "parseItem">
  >;
};

export function Select<T extends object>({
  name,
  selectedCallback,
  onChange,
  parseItem,
  items,
  style,
  error,
  className,
  placeholder,
  Wrapper = ({ children }) => <div>{children}</div>,
  Component,
  mode,
}: Props<T>) {
  const [isOpened, onOpen, onClose] = useModal();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(selectedCallback);

  const onClick = (item: T) => {
    switch (mode) {
      case "multi":
        console.log("→ multi");
        break;
      case "single":
        onChange(item);
        onClose();
        break;
    }
  };

  return (
    <>
      {name && <Input name={name} hidden />}
      <div
        ref={wrapperRef}
        onClick={onOpen}
        style={style}
        className={cn(
          styles.select,
          {
            [styles.error]: error,
          },
          className
        )}
      >
        {selectedItem ? (
          <Flex alignCenter h100>
            {parseItem(selectedItem)}
          </Flex>
        ) : (
          <Flex className={styles.placeholder} alignCenter h100>
            {placeholder || "Select..."}
          </Flex>
        )}
      </div>
      <Dropdown
        buttonRef={wrapperRef}
        style={{ padding: "0", width: "auto" }}
        isOpened={isOpened}
        onClose={onClose}
      >
        <Scrollable style={{ maxHeight: "500px" }} overlay hiddenX>
          <Wrapper>
            {items.map((item, index) => (
              <Component
                key={("id" in item ? item!.id : index) as Key}
                data={item}
                onClick={() => onClick(item)}
                selected={selectedCallback(item)}
                parseItem={parseItem}
              />
            ))}
          </Wrapper>
        </Scrollable>
      </Dropdown>
    </>
  );
}
