import { Category } from "@components";
import { EditCategoryDrawer } from "@containers";
import { useOpen } from "@hooks";

export const CategoryEmpty = () => {
  const [isOpened, onOpen, onClose] = useOpen();

  return (
    <>
      <Category.Card color="0" empty onClick={onOpen}>
        <Category.Icon icon="plus"></Category.Icon>
        <Category.Info name="Add category"></Category.Info>
      </Category.Card>
      <EditCategoryDrawer is={isOpened} onClose={onClose} mode="create" />
    </>
  );
};
