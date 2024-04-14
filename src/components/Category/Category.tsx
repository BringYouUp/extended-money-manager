import { Flex, Icon, Text } from "@components";

import { OmittedStoreFields, StoreCategoriesCategory } from "@models";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useModal } from "@hooks";
import { CategoryDrawer } from "@containers";
import { MouseEvent, MouseEventHandler } from "react";

type Props = {
  data:
    | StoreCategoriesCategory
    | Omit<StoreCategoriesCategory, OmittedStoreFields>;
  style?: React.CSSProperties;
  noClick?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | ((e: unknown) => void);
};

export const Category: React.FC<Props> = ({
  noClick,
  data,
  style,
  selected,
  onClick,
}) => {
  const [isOpened, onOpen, onClose] = useModal();

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (noClick) return;

    if (onClick || typeof onClick === "function") {
      return onClick(e);
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Flex
        style={
          {
            "--category-color": data.color,
            ...style,
          } as React.CSSProperties
        }
        className={cn(styles.category, {
          [styles.selected]: selected,
          [styles.deleted]: data.deleted,
          [styles[data.type]]: data.type,
        })}
        alignCenter
        onClick={onClickHandler}
      >
        <Flex gap={6} className={styles.container} alignCenter>
          {data.deleted ? (
            <Icon size={24} fill="var(--text-color-white-90)" name="trash" />
          ) : (
            <Icon
              size={24}
              fill="var(--text-color-white-90)"
              name={data.icon}
            />
          )}

          <Text
            ellipsed
            weight={600}
            color="var(--text-color-white-90)"
            className={cn(styles.label)}
          >
            {data.name ? (
              data.name
            ) : (
              <Text color="var(--text-color-white-50)">Name...</Text>
            )}
          </Text>
        </Flex>
      </Flex>
      <CategoryDrawer
        is={isOpened}
        onClose={onClose}
        data={data as StoreCategoriesCategory}
      />
    </>
  );
};
