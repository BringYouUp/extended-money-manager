import { Button, Flex, Icon, Text } from "@components";
import { cn } from "@utils";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  children?: never;
  icon: string;
  text: string;
  badgeColor: string | number | -1;
  active: boolean;
  type: "transaction-type" | "account" | "category";
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Badge: React.FC<Props> = ({
  className,
  style,
  icon,
  text,
  type,
  badgeColor,
  active,
  onRemove,
  ...rest
}) => {
  return (
    <Flex
      alignCenter
      gap={2}
      style={
        {
          "--badge-color": badgeColor !== -1 ? badgeColor : "",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        styles.badge,
        styles[type],
        {
          [styles.active]: active,
          [styles.black]: badgeColor === -1,
        },
        className,
      )}
      {...rest}
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
