import { cn } from "@utils";
import styles from "./index.module.css";
import { Button, Flex, Icon, Text } from "@components";
import { MouseEventHandler } from "react";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: never;
  icon: string;
  text: string;
  color: number | string;
  active: boolean;
  type: "transaction-type" | "account" | "category";
  onClick?: MouseEventHandler<HTMLDivElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
};

export const Badge: React.FC<Props> = ({
  className,
  style,
  icon,
  text,
  type,
  color,
  active,
  onClick,
  onRemove,
}) => {
  return (
    <Flex
      onClick={onClick}
      alignCenter
      gap={2}
      style={
        {
          "--badge-color": color,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.badge,
        styles[type],
        {
          [styles.active]: active,
          [styles.black]: color === -1,
        },
        className
      )}
    >
      <Flex gap={6} alignCenter>
        <Icon size={24} name={icon} />
        <Text ellipsed>{text}</Text>
      </Flex>
      {typeof onRemove === "function" ? (
        <Button rounded theme="transparent" onClick={(e) => onRemove(e)}>
          <Icon fill="var(--text-color-white-90)" name="close" />
        </Button>
      ) : null}
    </Flex>
  );
};
