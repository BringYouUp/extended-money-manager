import { transactionsEditTransaction } from "@async-actions";
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
import { TransactionForm } from "@containers";
import { useAppDispatch, useLoading, useOpen, useToast, useUID } from "@hooks";
import { useRef } from "react";

type Props = {
  is: boolean;
  onClose: () => void;
} & (
  | {
      mode: "edit";
      data: Store.Transaction;
      initialValues?: never;
    }
  | {
      mode: "create";
      data?: never;
      initialValues?: Partial<Store.Transaction>;
    }
);

export const EditTransactionDrawer: React.FC<Props> = ({
  is,
  initialValues,
  data,
  mode,
  onClose,
}: Props) => {
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

  const onCloseHandler = () => {
    onClose();
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
          onCloseHandler();
          createToast("transaction deleted", "success");
        })
        .finally(() => endLoading());
    }
  };

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onTryToClose = (forceClose: boolean = false) => {
    if (!forceClose) {
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
                  {mode === "create"
                    ? "Create transaction"
                    : "Edit transaction"}
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={() => onTryToClose(false)}
                >
                  <Icon size={16} name="close" />
                </Button>
              </Flex>

              <Scrollable full overlay>
                <Flex column gap={8} full justifyBetween>
                  <TransactionForm
                    onClose={(isForceClose) =>
                      onTryToClose(isForceClose as boolean)
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
          </Offset>
        </Container>
      </Drawer>
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
              <Text>Do you really want to delete transaction?</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onDeleteTransaction} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmDeleteModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
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
