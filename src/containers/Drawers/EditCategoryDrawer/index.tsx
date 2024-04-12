import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { CategoryForm } from "@containers";
import { SetStateAction, useState } from "react";
import {
  CategoryFormFormFields,
  StoreCategoriesCategory,
  StoreCategoriesCategoryTypes,
  StoreCategoryIcon,
} from "@models";
import { useDebounce } from "@hooks";
import { Category } from "src/components/Category";

type Props = {
  is: boolean;
  onClose: () => void;
} & (
  | {
      mode: "edit";
      data: StoreCategoriesCategory;
    }
  | {
      mode: "create";
      data?: never;
    }
);

export const EditCategoryDrawer: React.FC<Props> = ({
  is,
  data,
  mode,
  onClose,
}: Props) => {
  const [values, setValues] = useState<CategoryFormFormFields>(
    {} as CategoryFormFormFields
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues(values as SetStateAction<CategoryFormFormFields>);
  }, 125);

  return (
    <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="300px">
        <Offset full padding={[16]}>
          <Flex full column gap={16}>
            <Flex justifyBetween alignCenter>
              <Text as="h3">
                {mode === "create" ? "Create category" : "Edit category"}
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Flex>

            <Scrollable full overlay>
              <Flex column gap={16}>
                <CategoryForm
                  onClose={onClose}
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
                            "") as StoreCategoryIcon,
                          type: (values["category-type"] ||
                            "") as StoreCategoriesCategoryTypes,
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
        </Offset>
      </Container>
    </Drawer>
  );
};
