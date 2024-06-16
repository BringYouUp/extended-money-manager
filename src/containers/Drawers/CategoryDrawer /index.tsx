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
  Spinner,
  Text,
} from "@components";
import { EditCategoryDrawer, EditTransactionDrawer } from "@containers";
import { useAppDispatch, useLoading, useOpen, useToast, useUID } from "@hooks";
import { Category } from "src/components/Category";
import { categoriesEditCategory } from "@async-actions";

type Props = {
  is: boolean;
  onClose: () => void;
  data: Store.Category;
};

export const CategoryDrawer: React.FC<Props> = ({
  is,
  data,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const uid = useUID();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { createToast } = useToast();

  const [
    isEditCategoryDrawerOpened,
    onOpenEditCategoryDrawer,
    onCloseEditCategoryDrawer,
  ] = useOpen();

  const [
    isTransactionDrawerOpened,
    onOpenTransactionDrawer,
    onCloseTransactionDrawer,
  ] = useOpen();

  const [
    isOpenedConfirmDeleteModal,
    onOpenConfirmDeleteModal,
    onCloseConfirmDeleteModal,
  ] = useOpen();

  const onUpdatedeleteStatus = (newDeleteStatus: boolean) => () => {
    if (isOpenedConfirmDeleteModal) {
      onCloseConfirmDeleteModal();
    }

    startLoading();
    dispatch(
      categoriesEditCategory({
        category: {
          ...data,
          deleted: newDeleteStatus,
        },
        uid,
      })
    )
      .then(() => {
        onClose();
        createToast("category deleted", "success");
      })
      .finally(() => endLoading());
  };

  return (
    <>
      <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset h100 padding={[24, 16]}>
            <Flex column full gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3" uppercase>
                  Category
                </Text>

                <Flex gap={16}>
                  {!data.deleted && (
                    <Button
                      theme="transparent"
                      rounded
                      onClick={onOpenEditCategoryDrawer}
                    >
                      <Icon name="edit" />
                    </Button>
                  )}
                  <Button theme="transparent" rounded onClick={onClose}>
                    <Icon size={16} name="close" />
                  </Button>
                </Flex>
              </Flex>

              <Flex w100 center>
                <Category noClick style={{ zIndex: 2 }} data={data} />
              </Flex>

              <Scrollable full overlay>
                <Flex full justifyBetween flex1 column gap={16}>
                  <Flex column gap={16}>
                    <Button
                      centered={false}
                      // onClick={onOpenTransactionDrawer}
                      theme="outline"
                    >
                      <Flex w100 gap={6} alignCenter justifyBetween>
                        <Text weight={500} uppercase>
                          Transactions
                        </Text>
                        <Icon name="list" />
                      </Flex>
                    </Button>
                    <Button
                      centered={false}
                      onClick={onOpenTransactionDrawer}
                      theme="outline"
                      _role={
                        data.type === "income"
                          ? "success"
                          : data.type === "withdraw"
                          ? "warning"
                          : undefined
                      }
                    >
                      <Flex w100 gap={6} alignCenter justifyBetween>
                        <Text weight={500} uppercase>
                          Create{" "}
                          {data.type === "income"
                            ? "income"
                            : data.type === "withdraw"
                            ? "withdraw"
                            : ""}
                        </Text>
                        <Icon name="list" />
                      </Flex>
                    </Button>
                  </Flex>
                  {!data.deleted ? (
                    <Button
                      onClick={onOpenConfirmDeleteModal}
                      theme="outline"
                      disabled={isLoading}
                      _role="error"
                    >
                      <Flex gap={6} alignCenter>
                        <Text weight={500} uppercase>
                          Delete
                        </Text>
                        {isLoading ? (
                          <Spinner size={14} />
                        ) : (
                          <Icon name="trash" />
                        )}
                      </Flex>
                    </Button>
                  ) : (
                    <Button
                      _role="error"
                      centered={false}
                      onClick={onUpdatedeleteStatus(false)}
                      theme="outline"
                      disabled={isLoading}
                    >
                      <Flex w100 gap={6} alignCenter justifyBetween>
                        <Text weight={500} uppercase>
                          Restore
                        </Text>
                        {isLoading ? (
                          <Spinner size={14} />
                        ) : (
                          <Icon name="restore" />
                        )}
                      </Flex>
                    </Button>
                  )}
                </Flex>
              </Scrollable>
            </Flex>
          </Offset>
        </Container>
      </Drawer>
      <EditCategoryDrawer
        is={Boolean(isEditCategoryDrawerOpened)}
        mode="edit"
        data={data as Store.Category}
        onClose={onCloseEditCategoryDrawer}
      />
      <EditTransactionDrawer
        is={isTransactionDrawerOpened}
        mode="create"
        onClose={onCloseTransactionDrawer}
        initialValues={{
          type: data.type,
          categoryId: data.id,
        }}
      />
      <Modal
        isOpened={isOpenedConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
      >
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to delete category?</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onUpdatedeleteStatus(true)} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmDeleteModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
    </>
  );
};
