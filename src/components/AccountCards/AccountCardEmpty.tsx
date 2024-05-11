import { Flex, Icon, Text } from "@components";
import { useOpen } from "@hooks";

import { AccountCardWrap } from "@components";
import { EditAccountDrawer } from "@containers";

export const AccountCardEmpty: React.FC = () => {
  const [isOpened, onOpen, onClose] = useOpen();

  return (
    <>
      <AccountCardWrap onClick={onOpen} empty color="0">
        <Flex column full gap={16} center>
          <Flex full center gap={6}>
            <Icon name="plus" fill="var(--text-color-white)" />
            <Text size={14} weight={600} color="var(--text-color-white)">
              Add account
            </Text>
          </Flex>
        </Flex>
      </AccountCardWrap>
      <EditAccountDrawer
        is={Boolean(isOpened)}
        mode="create"
        onClose={onClose}
      />
    </>
  );
};
