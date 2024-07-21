import { accountsEditAccount } from "@async-actions";
import {
  Account,
  Button,
  Drawer,
  Flex,
  Icon,
  Modal,
  Scrollable,
  Spinner,
  Text,
} from "@components";
import { EditAccountDrawer, EditTransactionDrawer } from "@containers";
import { useAppDispatch, useLoading, useOpen, useToast, useUID } from "@hooks";
import { useRef } from "react";

type Props = {
  is: boolean;
  onClose: () => void;
  data: Store.Account;
};

export const AccountDrawer: React.FC<Props> = ({
  is,
  onClose,
  data,
}: Props) => {
  const dispatch = useAppDispatch();
  const uid = useUID();
  const { isLoading, startLoading, endLoading } = useLoading();
  const { createToast } = useToast();

  const [
    isEditAccountDrawerOpened,
    onOpenEditAccountDrawer,
    onCloseEditAccountDrawer,
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

  const transactionDrawerTypeRef = useRef<Store.TransactionType>();

  const onUpdatedeleteStatus = (newDeleteStatus: boolean) => () => {
    if (isOpenedConfirmDeleteModal) {
      onCloseConfirmDeleteModal();
    }

    startLoading();
    dispatch(
      accountsEditAccount({
        account: {
          ...data,
          deleted: newDeleteStatus,
        },
        uid,
      })
    )
      .then(() => {
        onClose();
        createToast("account deleted", "success");
      })
      .finally(() => endLoading());
  };

  const onOpenTransactionDrawerHandler =
    (type: Store.TransactionType) => () => {
      transactionDrawerTypeRef.current = type;
      onOpenTransactionDrawer();
    };

  return (
    <>
      <Drawer side="right" isOpened={is} onClose={onClose}>
        <Drawer.Container>
          <Drawer.Content>
            <Flex column full gap={24}>
              <Flex justifyBetween alignCenter>
                <Drawer.Title>Account</Drawer.Title>
                <Flex gap={16}>
                  {!data.deleted && (
                    <Button
                      theme="transparent"
                      rounded
                      onClick={onOpenEditAccountDrawer}
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
                <Account noClick style={{ zIndex: 2 }} data={data} />
              </Flex>
              <Scrollable full overlay>
                <Flex full justifyBetween flex1 column gap={16}>
                  <Flex column gap={16}>
                    <Button
                      centered={false}
                      // onClick={onShowTransactions}
                      theme="outline"
                    >
                      <Flex w100 gap={6} alignCenter justifyBetween>
                        <Text uppercase weight={500}>
                          Transactions
                        </Text>
                        <Icon name="list" />
                      </Flex>
                    </Button>
                    {!data.deleted && (
                      <>
                        <Button
                          centered={false}
                          theme="outline"
                          onClick={onOpenTransactionDrawerHandler("income")}
                          _role="success"
                        >
                          <Flex w100 gap={6} alignCenter justifyBetween>
                            <Text uppercase weight={500}>
                              Income
                            </Text>
                            <Icon name="income" />
                          </Flex>
                        </Button>
                        <Button
                          centered={false}
                          onClick={onOpenTransactionDrawerHandler("withdraw")}
                          theme="outline"
                          _role="warning"
                        >
                          <Flex w100 gap={6} alignCenter justifyBetween>
                            <Text uppercase weight={500}>
                              Withdraw
                            </Text>
                            <Icon name="withdraw" />
                          </Flex>
                        </Button>
                        <Button
                          centered={false}
                          onClick={onOpenTransactionDrawerHandler("transfer")}
                          theme="outline"
                        >
                          <Flex w100 gap={6} alignCenter justifyBetween>
                            <Text uppercase weight={500}>
                              Transfer
                            </Text>
                            <Icon name="transfer" />
                          </Flex>
                        </Button>
                      </>
                    )}
                  </Flex>
                  {!data.deleted ? (
                    <Button
                      onClick={onOpenConfirmDeleteModal}
                      theme="outline"
                      disabled={isLoading}
                      _role="error"
                    >
                      <Flex gap={6} alignCenter>
                        <Text uppercase weight={500}>
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
                        <Text uppercase weight={500}>
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
          </Drawer.Content>
        </Drawer.Container>
      </Drawer>
      <EditAccountDrawer
        is={Boolean(isEditAccountDrawerOpened)}
        mode="edit"
        data={data as Store.Account}
        onClose={onCloseEditAccountDrawer}
      />
      <EditTransactionDrawer
        is={isTransactionDrawerOpened}
        mode="create"
        onClose={onCloseTransactionDrawer}
        initialValues={{
          type: transactionDrawerTypeRef.current,
          accountId: data.id,
        }}
      />
      <Modal
        isOpened={isOpenedConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
      >
        <Modal.Wrapper>
          <Modal.Container>
            <Modal.Top>
              <Modal.Title>Confirm</Modal.Title>
              <Modal.Subtitle>
                Do you really want to delete account?
              </Modal.Subtitle>
            </Modal.Top>
            <Modal.Actions>
              <Button onClick={onUpdatedeleteStatus(true)} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmDeleteModal} theme="primary">
                No
              </Button>
            </Modal.Actions>
          </Modal.Container>
        </Modal.Wrapper>
      </Modal>
    </>
  );
};
