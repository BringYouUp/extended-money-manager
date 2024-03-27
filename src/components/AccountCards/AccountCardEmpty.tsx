import { Flex, Icon, Text } from "@components";
import { useModal } from "@hooks";

import { AccountCardWrap } from "@components";
import { AccountDrawer } from "@containers";

export const AccountCardEmpty: React.FC = () => {
  const [isOpened, onOpen, onClose] = useModal();

  return (
    <>
      <AccountCardWrap onClick={onOpen} empty color="0">
        <Flex column full gap={16} center>
          <Flex full center gap={6}>
            <Icon name="plus" fill="var(--text-color-white)" />
            <Text size={14} weight={500} color="var(--text-color-white)">
              Add account
            </Text>
          </Flex>
        </Flex>
      </AccountCardWrap>
      <AccountDrawer is={Boolean(isOpened)} mode="create" onClose={onClose} />
    </>
  );
};
