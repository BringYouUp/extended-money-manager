import { Flex, Icon, Text } from "@components";

import styles from "./index.module.css";
import { cn } from "@utils";
import { useModal } from "@hooks";
import { EditTransactionDrawer } from "@containers";

type Props = {
  style?: React.CSSProperties;
};

export const TransactionEmpty: React.FC<Props> = ({ style }) => {
  const [isOpened, onOpen, onClose] = useModal();

  return (
    <>
      <Flex
        style={style}
        className={cn(styles.transaction, "w100", {
          [styles.empty]: true,
        })}
        alignCenter
        onClick={onOpen}
      >
        <Flex gap={6} className={styles["transaction-container"]} alignCenter>
          <Icon fill="var(--text-color-white-90)" size={20} name="plus" />

          <Flex flex1 gap={12} alignFlexEnd>
            <Text
              weight={600}
              color="var(--text-color-white-90)"
              className={cn(styles.label)}
            >
              Add transaction
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <EditTransactionDrawer is={isOpened} onClose={onClose} mode="create" />
    </>
  );
};
