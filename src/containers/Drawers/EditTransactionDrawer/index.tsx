import { transactionsEditTransaction } from "@async-actions";
import {
  Button,
  Drawer,
  Flex,
  Icon,
  Modal,
  Scrollable,
  Spinner,
  Text,
} from "@components";
import { TransactionForm } from "@containers";
import { withClosingComfirmation } from "@hocs/withClosingComfirmation";
import { useAppDispatch, useLoading, useOpen, useToast, useUID } from "@hooks";
import { useRef } from "react";

export const TransactionDrawer: React.FC<
  Components.TransactionDrawer.Props & Hocs.WithClosingConfirmation.Props
> = ({ is, initialValues, data, mode, onClose }) => {
  const dispatch = useAppDispatch();
  const uid = useUID();
  const { createToast } = useToast();
  const { isLoading, startLoading, endLoading } = useLoading();
  const isFormChanged = useRef<boolean>(false);

  const [
    isOpenedConfirmDeleteModal,
    onOpenConfirmDeleteModal,
    onCloseConfirmDeleteModal,
  ] = useOpen();

  const onCleanUp = () => {
    isFormChanged.current = false;
  };

  const onDeleteTransaction = () => {
    if (isOpenedConfirmDeleteModal) {
      onCloseConfirmDeleteModal();
    }

    if (mode === "edit" && !data.deleted) {
      startLoading();
      dispatch(
        transactionsEditTransaction({
          transaction: {
            ...data,
            deleted: true,
          },
          uid,
        })
      )
        .then(() => {
          onClose(true, onCleanUp);
          createToast("transaction deleted", "success");
        })
        .finally(() => endLoading());
    }
  };

  const onCloseDrawer = (forceClose: boolean = false) => {
    onClose(forceClose || !isFormChanged.current, onCleanUp);
  };

  return (
    <>
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
                  {mode === "create"
                    ? "Create transaction"
                    : "Edit transaction"}
                </Drawer.Title>
                <Button
                  theme="transparent"
                  rounded
                  onClick={() => onCloseDrawer()}
                >
                  <Icon size={16} name="close" />
                </Button>
              </Flex>

              <Scrollable full overlay>
                <Flex column gap={8} full justifyBetween>
                  <TransactionForm
                    onClose={(isForceClose) =>
                      onCloseDrawer(isForceClose as boolean)
                    }
                    mode={mode}
                    data={mode === "edit" ? data : (undefined as never)}
                    initialValues={
                      mode === "create" ? initialValues : (undefined as never)
                    }
                    isFormChanged={isFormChanged}
                  />
                  {mode === "edit" && !data.deleted && (
                    <Button onClick={onOpenConfirmDeleteModal} theme="outline">
                      <Flex w100 gap={6} center>
                        <Text uppercase>Delete</Text>
                        {isLoading ? (
                          <Spinner size={14} />
                        ) : (
                          <Icon name="trash" />
                        )}
                      </Flex>
                    </Button>
                  )}
                </Flex>
              </Scrollable>
            </Flex>
          </Drawer.Content>
        </Drawer.Container>
      </Drawer>
      <Modal
        isOpened={isOpenedConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
      >
        <Modal.Wrapper>
          <Modal.Container>
            <Modal.Top>
              <Modal.Title>Confirm</Modal.Title>
              <Modal.Subtitle>
                Do you really want to delete transaction?
              </Modal.Subtitle>
            </Modal.Top>
            <Flex gap={16}>
              <Button onClick={onDeleteTransaction} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmDeleteModal} theme="primary">
                No
              </Button>
            </Flex>
          </Modal.Container>
        </Modal.Wrapper>
      </Modal>
    </>
  );
};

export const EditTransactionDrawer =
  withClosingComfirmation<Components.TransactionDrawer.Props>({
    title: "Confirm",
    subtitle: "Do you really want to close drawer?",
  })(TransactionDrawer);
