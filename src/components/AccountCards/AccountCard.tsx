import { Flex, Text } from "@components";
import { useModal } from "@hooks";

import { StoreAccountsAccount } from "@models";
import { AccountCardWrap } from "@components";
import { AccountDrawer } from "@containers";

type Props = {
  data: StoreAccountsAccount | Omit<StoreAccountsAccount, "id" | "createdAt">;
  style?: React.CSSProperties;
  noClick?: boolean;
};

export const AccountCard: React.FC<Props> = ({ noClick, data, style }) => {
  const [isOpened, onOpen, onClose] = useModal();

  const onOpenHandler = () => {
    if (noClick) return;
    onOpen();
  };

  return (
    <>
      <AccountCardWrap style={style} onClick={onOpenHandler} color={data.color}>
        <Flex className="full-h" column gap={16} alignFlexEnd justifyBetween>
          <Text
            ellipsed
            right
            size={12}
            weight={500}
            color="var(--text-color-white-90)"
          >
            {data.name ? (
              data.name
            ) : (
              <Text color="var(--text-color-white-50)">Name...</Text>
            )}
          </Text>
          <Flex gap={6}>
            <Text
              style={{ flex: 1 }}
              ellipsed
              right
              size={24}
              weight={700}
              color="var(--text-color-white-90)"
            >
              {data.amount ? (
                data.amount
              ) : (
                <Text color="var(--text-color-white-50)">0</Text>
              )}
            </Text>
            <Text
              right
              size={24}
              weight={700}
              color="var(--text-color-white-90)"
            >
              {data.currency || "$"}
            </Text>
          </Flex>
        </Flex>
      </AccountCardWrap>
      <AccountDrawer
        is={isOpened as boolean}
        mode="edit"
        onClose={onClose}
        data={data as StoreAccountsAccount}
      />
    </>
  );
};
