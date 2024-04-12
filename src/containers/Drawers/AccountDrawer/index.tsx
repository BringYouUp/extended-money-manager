import { accountsEditAccount } from "@async-actions";
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
import { AccountCard } from "@components";
import { EditAccountDrawer } from "@containers";
import { useAppDispatch, useLoading, useModal, useUID } from "@hooks";
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

  const [
    isEditAccountDrawerOpened,
    onOpenEditAccountDrawer,
    onCloseEditAccountDrawer,
  ] = useModal();

  // const [
  //   isTransactionDrawerOpened,
  //   onOpenTransactionDrawer,
  //   onCloseTransactionDrawer,
  // ] = useModal();

  const transactionTraderType = useRef<StoreTransactionsTransactionType>();

  // const onShowTransactions = () => {
  //   console.log("→ show");
  // };

  const onUpdatedeleteStatus = (newDeleteStatus: boolean) => () => {
    startLoading();
    dispatch(
      accountsEditAccount({
        account: {
          ...data,
          deleted: newDeleteStatus,
        },
        uid,
      })
    ).finally(() => endLoading());
  };

  const onOpenTransactionDrawerHandler =
    (type: StoreTransactionsTransactionType) => () => {
      transactionTraderType.current = type;
      // onOpenTransactionDrawer();
    };

  return (
    <>
      <Drawer side="right" isOpened={is} onClose={onClose}>
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset h100 padding={[16]}>
            <Flex column full gap={24}>
              <Flex justifyBetween alignCenter>
                <Text as="h3">Account</Text>
                <Flex gap={6}>
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
                        <Text color="var(--text-color-70)" as="h6">
                          Transactions
                        </Text>
                        <Icon fill="var(--text-color-70)" name="browse" />
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
                            <Text color="var(--text-color-70)" as="h6">
                              Income
                            </Text>
                            <Icon fill="var(--text-color-70)" name="income" />
                          </Flex>
                        </Button>
                        <Button
                          centered={false}
                          onClick={onOpenTransactionDrawerHandler("withdraw")}
                          theme="outline"
                          role="warning"
                        >
                          <Flex w100 gap={6} alignCenter justifyBetween>
                            <Text color="var(--text-color-70)" as="h6">
                              Withdraw
                            </Text>
                            <Icon fill="var(--text-color-70)" name="withdraw" />
                          </Flex>
                        </Button>
                        <Button
                          centered={false}
                          onClick={onOpenTransactionDrawerHandler("transfer")}
                          theme="outline"
                        >
                          <Flex w100 gap={6} alignCenter justifyBetween>
                            <Text color="var(--text-color-70)" as="h6">
                              Transfer
                            </Text>
                            <Icon fill="var(--text-color-70)" name="transfer" />
                          </Flex>
                        </Button>
                      </>
                    )}
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
                        <Text color="var(--text-color-70)" as="h6">
                          Delete
                        </Text>
                        {isLoading ? (
                          <Spinner size={14} />
                        ) : (
                          <Icon fill="var(--text-color-70)" name="trash" />
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
                        <Text color="var(--text-color-70)" as="h6">
                          Restore
                        </Text>
                        {isLoading ? (
                          <Spinner size={14} />
                        ) : (
                          <Icon fill="var(--text-color-70)" name="restore" />
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
    </>
  );
};
