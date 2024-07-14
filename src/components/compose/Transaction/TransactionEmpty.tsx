import { Text, Transaction } from "@components";
import { useOpen } from "@hooks";
import { EditTransactionDrawer } from "@containers";

import { cn } from "@utils";
import styles from "./index.module.css";

type Props = {
  style?: React.CSSProperties;
};

export const TransactionEmpty: React.FC<Props> = ({ style }) => {
  const [isOpened, onOpen, onClose] = useOpen();

  return (
    <>
      <Transaction.Wrap style={style} empty onClick={onOpen}>
        <Transaction.Icon name="plus" />
        <Transaction.Content>
          <Text weight={600} className={cn(styles.label)}>
            Add transaction
          </Text>
        </Transaction.Content>
      </Transaction.Wrap>
      <EditTransactionDrawer is={isOpened} onClose={onClose} mode="create" />
    </>
  );
};
