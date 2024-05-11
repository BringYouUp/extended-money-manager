import { accountsEditAccount } from "@async-actions";
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
import { AccountCard } from "@components";
import { EditAccountDrawer, EditTransactionDrawer } from "@containers";
import { useAppDispatch, useLoading, useOpen, useToast, useUID } from "@hooks";
import {
  StoreAccountsAccount,
  StoreTransactionsTransactionType,
} from "@models";
import { useRef } from "react";

type Props = {
  is: boolean;
  onClose: () => void;
  data: StoreAccountsAccount;
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

  const transactionDrawerTypeRef = useRef<StoreTransactionsTransactionType>();

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
    (type: StoreTransactionsTransactionType) => () => {
      transactionDrawerTypeRef.current = type;
      onOpenTransactionDrawer();
    };

  return (
    <>
      <Drawer side="right" isOpened={is} onClose={onClose}>
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset h100 padding={[24, 16]}>
            <Flex column full gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3" uppercase>
                  Account
                </Text>
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
                    <Icon name="close" />
                  </Button>
                </Flex>
              </Flex>
              <Flex w100 center>
                <AccountCard noClick style={{ zIndex: 2 }} data={data} />
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
                          role="success"
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
                          role="warning"
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
                      role="error"
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
                      role="error"
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
          </Offset>
        </Container>
      </Drawer>
      <EditAccountDrawer
        is={Boolean(isEditAccountDrawerOpened)}
        mode="edit"
        data={data as StoreAccountsAccount}
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
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to delete account?</Text>
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
