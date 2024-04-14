import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
  Spinner,
  Text,
} from "@components";
import { EditCategoryDrawer, EditTransactionDrawer } from "@containers";
import { StoreCategoriesCategory } from "@models";
import { useAppDispatch, useLoading, useModal, useUID } from "@hooks";
import { Category } from "src/components/Category";
import { categoriesEditCategory } from "@async-actions";

type Props = {
  is: boolean;
  onClose: () => void;
  data: StoreCategoriesCategory;
};

export const CategoryDrawer: React.FC<Props> = ({
  is,
  data,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const uid = useUID();
  const { isLoading, startLoading, endLoading } = useLoading();

  const [
    isEditCategoryDrawerOpened,
    onOpenEditCategoryDrawer,
    onCloseEditCategoryDrawer,
  ] = useModal();

  const [
    isTransactionDrawerOpened,
    onOpenTransactionDrawer,
    onCloseTransactionDrawer,
  ] = useModal();

  const onUpdatedeleteStatus = (newDeleteStatus: boolean) => () => {
    startLoading();
    dispatch(
      categoriesEditCategory({
        category: {
          ...data,
          deleted: newDeleteStatus,
        },
        uid,
      })
    ).finally(() => endLoading());
  };

  return (
    <>
      <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset h100 padding={[16]}>
            <Flex column full gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3">Category</Text>

                <Flex gap={6}>
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
                    <Icon name="close" />
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
                        <Icon name="browse" />
                      </Flex>
                    </Button>
                    <Button
                      centered={false}
                      onClick={onOpenTransactionDrawer}
                      theme="outline"
                      role={
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
                        <Icon name="browse" />
                      </Flex>
                    </Button>
                  </Flex>
                  {!data.deleted ? (
                    <Button
                      role="error"
                      centered={false}
                      onClick={onUpdatedeleteStatus(true)}
                      theme="outline"
                      disabled={isLoading}
                    >
                      <Flex w100 gap={6} alignCenter justifyBetween>
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
                      role="error"
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
        data={data as StoreCategoriesCategory}
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
    </>
  );
};
