import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Text,
} from "@components";
import { CategoryForm } from "@containers";
import { SetStateAction, useState } from "react";
import {
  StoreCategoriesCategory,
  StoreCategoryIcon,
  UseFormValues,
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

export const CategoryDrawer: React.FC<Props> = ({
  is,
  data,
  mode,
  onClose,
}: Props) => {
  const [values, setValues] = useState<
    UseFormValues<"category-name" | "category-icon" | "category-color">
  >({});

  const setDebouncedValues = useDebounce((values) => {
    setValues(
      values as SetStateAction<
        UseFormValues<"category-name" | "category-icon" | "category-color">
      >
    );
  }, 125);

  return (
    <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="300px">
        <Offset padding={[16]}>
          <Flex column gap={16}>
            <Flex justifyBetween alignCenter>
              <Text as="h3">
                {mode === "create" ? "Create category" : "Edit category"}
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Flex>

            <CategoryForm
              onClose={onClose}
              setValues={setDebouncedValues}
              mode={mode}
              data={data}
            />
            <hr />
            <Offset margin={[12, 0, 0, 0]}>
              <Text weight={500} as="h4" center>
                Preview:
              </Text>
            </Offset>
            <Flex center full>
              <Category
                noClick
                style={{ zIndex: 2 }}
                data={{
                  color: values["category-color"] || "",
                  name: values["category-name"] || "",
                  icon: (values["category-icon"] || "") as StoreCategoryIcon,
                  currency: "$",
                }}
              />
            </Flex>
          </Flex>
        </Offset>
      </Container>
    </Drawer>
  );
};
