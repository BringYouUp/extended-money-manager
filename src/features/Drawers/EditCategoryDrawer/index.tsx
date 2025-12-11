import { Category } from "@entities/Category";
import { Drawer } from "@entities/Drawer";
import { CategoryForm } from "@features/Forms";
import { withClosingConfirmation } from "@hocs/withClosingConfirmation";
import { useDebounce } from "@hooks/useDebounce";
import { Flex, Offset, Scrollable, Text } from "@ui";
import { FC, SetStateAction, useRef, useState } from "react";
import { INITIAL_STATE } from "./consts";

const CategoryDrawer: FC<
	Components.CategoryDrawer.Props & Hocs.WithClosingConfirmation.Props
> = ({ is, data, mode, onClose }) => {
	const isFormChanged = useRef<boolean>(false);

	const [values, setValues] = useState<Components.Form.Category>(
		mode === "edit"
			? {
					"category-name": data.name,
					"category-icon": data.icon,
					"category-color": data.color,
					"category-type": data.type,
					"category-currency": data.currency,
				}
			: ({} as Components.Form.Category),
	);

	const setDebouncedValues = useDebounce((values) => {
		isFormChanged.current = true;
		setValues(values as Components.Form.Category);
	}, 125);

	const onCleanUp = () => {
		isFormChanged.current = false;
		setDebouncedValues(
			INITIAL_STATE as SetStateAction<Components.Form.Category>,
		);
	};

	const onCloseDrawer = (forceClose: boolean = false) => {
		onClose(forceClose || !isFormChanged.current, onCleanUp);
	};

	return (
		<Drawer
			side="right"
			isOpened={Boolean(is)}
			onClose={() => onCloseDrawer(false)}
		>
			<Drawer.Container>
				<Drawer.Content>
					<Flex full column gap={24}>
						<Flex justifyBetween alignCenter>
							<Drawer.Title>
								{mode === "create" ? "Create category" : "Edit category"}
							</Drawer.Title>
							<Drawer.Close onClose={onCloseDrawer} />
						</Flex>

						<Scrollable full overlay>
							<Flex column gap={16}>
								<CategoryForm
									onClose={(isForceClose) =>
										onCloseDrawer(isForceClose as boolean)
									}
									setValues={setDebouncedValues}
									mode={mode}
									data={mode === "edit" ? data : (undefined as never)}
								/>
								<Offset padding={[16, 0]}>
									<Flex column gap={16}>
										<Text weight={500} as="h4" center>
											Preview:
										</Text>
										<hr />
										<Flex justifyCenter full>
											<Category
												noClick
												style={{ zIndex: 2 }}
												data={{
													color: values["category-color"] || "",
													name: values["category-name"] || "",
													icon: (values["category-icon"] ||
														"") as Store.CategoryIcon,
													type: (values["category-type"] ||
														"") as Store.CategoryType,
													deleted: false,
													currency: "$",
												}}
											/>
										</Flex>
									</Flex>
								</Offset>
							</Flex>
						</Scrollable>
					</Flex>
				</Drawer.Content>
			</Drawer.Container>
		</Drawer>
	);
};

export const EditCategoryDrawer =
	withClosingConfirmation<Components.CategoryDrawer.Props>({
		title: "Confirm",
		subtitle: "Do you really want to close drawer?",
	})(CategoryDrawer);
