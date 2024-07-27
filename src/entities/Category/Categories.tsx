import { useAppSelector } from "@hooks/useAppSelector";
import { Flex, Skeleton, Text } from "@ui";

import { Category, CategoryEmpty } from ".";
import styles from "./index.module.css";
import { CATEGORY_SELECTOR } from "@selectors";

export const Categories = () => {
  const categories = useAppSelector(
    CATEGORY_SELECTOR.visibleCategoriesSelector
  );
  const status = useAppSelector((state) => state.categories.status);

  if (status === "categories/categoriesSetCategories/pending") {
    return new Array(12).fill(null).map((_, index) => {
      return (
        <Skeleton
          style={
            {
              ["--category-min-width"]: `${
                Math.floor(Math.random() * 80) + 65
              }px`,
            } as React.CSSProperties
          }
          key={index}
          className={styles.category}
        />
      );
    });
  }

  if (categories.length === 0) {
    return (
      <Flex w100 center column gap={8}>
        <Text as="h4">You have not any category</Text>
        <CategoryEmpty />
      </Flex>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <Category key={category.id} data={category} />
      ))}
      <CategoryEmpty />
    </>
  );
};
