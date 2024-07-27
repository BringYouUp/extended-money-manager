import { useOpen } from "@hooks/useOpen";

import React from "react";
import { Account } from ".";
import { EditAccountDrawer } from "@features/Drawers";

export const AccountEmpty: React.FC = () => {
  const [isOpened, onOpen, onClose] = useOpen();

  return (
    <>
      <Account.Wrap onClick={onOpen} empty color="0">
        <Account.Empty />
      </Account.Wrap>
      <EditAccountDrawer
        is={Boolean(isOpened)}
        mode="create"
        onClose={onClose}
      />
    </>
  );
};
