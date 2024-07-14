import {
  Button,
  Drawer,
  Flex,
  Modal,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { CategoryForm } from "@containers";
import { useDebounce, useOpen } from "@hooks";
import { SetStateAction, useRef, useState } from "react";
import { Category } from "src/components/compose/Category";

const INITIAL_STATE = {};

type Props = {
  is: boolean;
  onClose: () => void;
} & (
  | {
      mode: "edit";
      data: Store.Category;
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

  const [values, setValues] = useState<Components.Form.Category>(
    {} as Components.Form.Category
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues((prev) => {
      if (Object.keys(values || {}).length && Object.keys(prev).length) {
        isFormChanged.current = true;
      }

      return values as Components.Form.Category;
    });
  }, 125);

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onCloseHandler = () => {
    onClose();
    isFormChanged.current = false;
    setDebouncedValues(
      INITIAL_STATE as SetStateAction<Components.Form.Category>
    );
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
        <Drawer.Container>
          <Drawer.Content>
            <Flex full column gap={24}>
              <Flex justifyBetween alignCenter>
                <Drawer.Title>
                  {mode === "create" ? "Create category" : "Edit category"}
                </Drawer.Title>
                <Drawer.Close onClose={() => onTryToClose(false)} />
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
      <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
        <Modal.Wrapper>
          <Modal.Container>
            <Modal.Top>
              <Modal.Title>Confirm</Modal.Title>
              <Modal.Subtitle>
                Do you really want to close drawer
              </Modal.Subtitle>
            </Modal.Top>
            <Flex gap={16}>
              <Button onClick={onConfirmClose} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmModal} theme="primary">
                No
              </Button>
            </Flex>
          </Modal.Container>
        </Modal.Wrapper>
      </Modal>
    </>
  );
};
