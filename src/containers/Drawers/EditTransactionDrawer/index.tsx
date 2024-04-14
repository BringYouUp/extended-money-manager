import { transactionsEditTransaction } from "@async-actions";
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
import { TransactionForm } from "@containers";
import { useAppDispatch, useLoading, useUID } from "@hooks";
import { StoreTransactionsTransaction } from "@models";

type Props = {
  is: boolean;
  onClose: () => void;
} & (
  | {
      mode: "edit";
      data: StoreTransactionsTransaction;
      initialValues?: never;
    }
  | {
      mode: "create";
      data?: never;
      initialValues?: Partial<StoreTransactionsTransaction>;
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

  const { isLoading, startLoading, endLoading } = useLoading();

  const onDeleteTransaction = () => {
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
      ).finally(() => endLoading());
    }
  };

  return (
    <Drawer side="right" isOpened={Boolean(is)} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="300px">
        <Offset full padding={[16]}>
          <Flex full column gap={16}>
            <Flex justifyBetween alignCenter>
              <Text as="h3">
                {mode === "create" ? "Create transaction" : "Edit transaction"}
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Flex>

            <Scrollable full overlay>
              <Flex column gap={8} full>
                <TransactionForm
                  onClose={onClose}
                  mode={mode}
                  data={mode === "edit" ? data : (undefined as never)}
                  initialValues={
                    mode === "create" ? initialValues : (undefined as never)
                  }
                />
                {mode === "edit" && !data.deleted && (
                  <Button onClick={onDeleteTransaction} theme="outline">
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
  );
};
