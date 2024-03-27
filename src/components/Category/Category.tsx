import { Flex, Icon, Text } from "@components";

import { StoreCategoriesCategory } from "@models";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useModal } from "@hooks";
import { CategoryDrawer } from "@containers";

type Props = {
  data:
    | StoreCategoriesCategory
    | Omit<StoreCategoriesCategory, "id" | "createdAt">;
  style?: React.CSSProperties;
};

export const Category: React.FC<Props> = ({ data, style }) => {
  const [isOpened, onOpen, onClose] = useModal();

  return (
    <>
      <Flex
        style={
          {
            "--category-color": data.color,
            ...style,
          } as React.CSSProperties
        }
        className={styles.wrapper}
        alignCenter
        onClick={onOpen}
      >
        <Flex gap={8} className={styles.container} alignCenter>
          <Icon size={24} fill="var(--text-color-white-90)" name={data.icon} />
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
        mode="edit"
      />
    </>
  );
};
