import { Dropdown, Flex, Input, Scrollable, Text } from "@components";
import { useOpen } from "@hooks";
import { cn } from "@utils";
import { Key, ReactNode, useRef } from "react";

import styles from "./index.module.css";

interface Props<T extends object> extends React.HTMLAttributes<HTMLDivElement> {
  selectedCallback: (item: T) => boolean;
  parseItem: (item: T) => React.ReactNode;
  onChangeValue: (item: T) => void;
  items: T[];
  disabled?: boolean;
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
}

export function Select<T extends object>({
  name,
  selectedCallback,
  onChangeValue,
  parseItem,
  items,
  style,
  disabled,
  error,
  className,
  placeholder,
  Wrapper = ({ children }) => <div>{children}</div>,
  Component,
  mode,
  ...rest
}: Props<T>) {
  const [isOpened, onOpen, onClose] = useOpen();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(selectedCallback);

  const onOpenHandler = () => {
    if (disabled) return;

    onOpen();
  };

  const onClick = (item: T) => {
    switch (mode) {
      case "multi":
        console.log("→ multi");
        break;
      case "single":
        onChangeValue(item);
        onClose();
        break;
    }
  };

  return (
    <>
      {name && <Input name={name} hidden />}
      <div
        ref={wrapperRef}
        onClick={onOpenHandler}
        style={style}
        className={cn(
          styles.select,
          {
            [styles.error]: error,
            disabled,
          },
          className,
        )}
        {...rest}
      >
        {selectedItem ? (
          <Flex className={cn(styles.preview)} alignCenter h100>
            <Text ellipsed>{parseItem(selectedItem)}</Text>
          </Flex>
        ) : (
          <Flex
            className={cn(styles.preview, styles.placeholder)}
            alignCenter
            h100
          >
            <Text ellipsed>{placeholder || "Select..."}</Text>
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
            {items.length ? (
              items.map((item, index) => (
                <Component
                  key={("id" in item ? item!.id : index) as Key}
                  data={item}
                  onClick={() => onClick(item)}
                  selected={selectedCallback(item)}
                  parseItem={parseItem}
                />
              ))
            ) : (
              <Text onClick={onClose} clickable>
                No data
              </Text>
            )}
          </Wrapper>
        </Scrollable>
      </Dropdown>
    </>
  );
}
