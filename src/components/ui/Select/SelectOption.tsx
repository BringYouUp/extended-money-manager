import { Button, Flex } from "@components";

type Props<T> = {
  selected: boolean;
  parseItem: (item: T) => React.ReactNode;
  onClick: (item: T) => void;
  data: T;
  style?: React.CSSProperties;
  className?: string;
};

export function SelectOption<T>({
  selected,
  parseItem,
  onClick,
  style,
  className,
  data,
  ...rest
}: Props<T>) {
  return (
    <Button
      style={style}
      className={className}
      centered={false}
      theme="transparent"
      onClick={() => onClick(data)}
      active={selected}
      {...rest}
    >
      <Flex alignCenter h100>
        {parseItem(data)}
      </Flex>
    </Button>
  );
}
