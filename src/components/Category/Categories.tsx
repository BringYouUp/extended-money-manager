import { Category } from "@components";

import { useAppSelector } from "@hooks";

export const Categories = () => {
  const categories = useAppSelector((state) => state.categories.categories);

  return categories.map((category) => (
    <Category key={category.id} data={category} />
  ));
};
