import { EditCategoryDrawer } from "@features/Drawers";
import { useOpen } from "@hooks/useOpen";
import { Category } from ".";

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
