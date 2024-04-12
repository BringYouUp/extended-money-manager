import { Category, Skeleton } from "@components";

import { useAppSelector } from "@hooks";
import styles from "./index.module.css";

export const Categories = () => {
  const categories = useAppSelector((state) => state.categories.categories);
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
          className={styles.wrapper}
        />
      );
    });
  }
  return categories.map((category) => (
    <Category key={category.id} data={category} />
  ));
};
