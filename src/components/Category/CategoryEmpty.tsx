import { Flex, Icon, Text } from "@components";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useModal } from "@hooks";
import { EditCategoryDrawer } from "@containers";

export const CategoryEmpty = () => {
  const [isOpened, onOpen, onClose] = useModal();

  return (
    <>
      <Flex
        style={
          {
            "--category-color": "0",
          } as React.CSSProperties
        }
        className={cn(styles.category, {
          [styles.empty]: true,
        })}
        alignCenter
        onClick={onOpen}
      >
        <Flex gap={6} className={styles.container} alignCenter>
          <Icon size={24} fill="var(--text-color-white-90)" name="plus" />
          <Text
            ellipsed
            weight={600}
            color="var(--text-color-white-90)"
            className={cn(styles.label)}
          >
            Add category
          </Text>
        </Flex>
      </Flex>
      <EditCategoryDrawer is={isOpened} onClose={onClose} mode="create" />
    </>
  );
};
