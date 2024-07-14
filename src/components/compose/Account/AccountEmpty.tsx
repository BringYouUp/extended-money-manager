import { Account } from "@components";
import { useOpen } from "@hooks";
import { EditAccountDrawer } from "@containers";
import React from "react";

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
