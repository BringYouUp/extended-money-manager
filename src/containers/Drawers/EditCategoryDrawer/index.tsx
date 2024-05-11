import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Modal,
  ModalWrapper,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { CategoryForm } from "@containers";
import { SetStateAction, useRef, useState } from "react";
import {
  CategoryFormFormFields,
  StoreCategoriesCategory,
  StoreCategoriesCategoryTypes,
  StoreCategoryIcon,
} from "@models";
import { useDebounce, useOpen } from "@hooks";
import { Category } from "src/components/Category";

const INITIAL_STATE = {};

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
  const isFormChanged = useRef<boolean>(false);

  const [values, setValues] = useState<CategoryFormFormFields>(
    {} as CategoryFormFormFields
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues((prev) => {
      if (Object.keys(values || {}).length && Object.keys(prev).length) {
        isFormChanged.current = true;
      }

      return values as CategoryFormFormFields;
    });
  }, 125);

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onCloseHandler = () => {
    onClose();
    isFormChanged.current = false;
    setDebouncedValues(INITIAL_STATE as SetStateAction<CategoryFormFormFields>);
  };

  const onTryToClose = (forceClose: boolean = false) => {
    if (!forceClose || typeof forceClose === "object") {
      if (isFormChanged.current) {
        return onOpenConfirmModal();
      } else {
        onCloseHandler();
      }
    } else {
      onCloseHandler();
    }
  };

  const onConfirmClose = () => {
    if (isOpenedConfirmModal) {
      onCloseConfirmModal();
    }

    onCloseHandler();
  };

  return (
    <>
      <Drawer
        side="right"
        isOpened={Boolean(is)}
        onClose={() => onTryToClose(false)}
      >
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset full padding={[24, 16]}>
            <Flex full column gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3" uppercase>
                  {mode === "create" ? "Create category" : "Edit category"}
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={() => onTryToClose(false)}
                >
                  <Icon name="close" />
                </Button>
              </Flex>

              <Scrollable full overlay>
                <Flex column gap={16}>
                  <CategoryForm
                    onClose={(isForceClose) =>
                      onTryToClose(isForceClose as boolean)
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
      <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to close drawer</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onConfirmClose} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
    </>
  );
};
