import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { TransactionForm } from "@containers";
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
              <TransactionForm
                onClose={onClose}
                mode={mode}
                data={mode === "edit" ? data : (undefined as never)}
                initialValues={
                  mode === "create" ? initialValues : (undefined as never)
                }
              />
            </Scrollable>
          </Flex>
        </Offset>
      </Container>
    </Drawer>
  );
};
