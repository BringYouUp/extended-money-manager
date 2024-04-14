import { Flex, Icon, Text } from "@components";
import { useModal } from "@hooks";

import { OmittedStoreFields, StoreAccountsAccount } from "@models";
import { AccountCardWrap } from "@components";
import { AccountDrawer } from "@containers";
import { MouseEvent, MouseEventHandler } from "react";

type Props = {
  data: StoreAccountsAccount | Omit<StoreAccountsAccount, OmittedStoreFields>;
  style?: React.CSSProperties;
  noClick?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | ((e: unknown) => void);
};

export const AccountCard: React.FC<Props> = ({
  noClick,
  data,
  selected,
  onClick,
  style,
  ...rest
}) => {
  const [isOpened, onOpen, onClose] = useModal();

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (noClick) return;

    if (onClick || typeof onClick === "function") {
      return onClick(e);
    } else {
      onOpen();
    }
  };

  return (
    <>
      <AccountCardWrap
        selected={selected}
        deleted={data.deleted}
        style={style}
        onClick={onClickHandler}
        color={data.color}
        {...rest}
      >
        <Flex className="h100" column gap={16} alignFlexEnd justifyBetween>
          <Flex alignCenter w100 gap={6}>
            {data.deleted && (
              <Icon fill="var(--text-color-white-90)" name="trash" size={12} />
            )}
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
          </Flex>
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
        onClose={onClose}
        data={data as StoreAccountsAccount}
      />
    </>
  );
};
