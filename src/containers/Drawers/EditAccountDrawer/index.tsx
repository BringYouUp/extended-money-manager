import {
  Account,
  Button,
  Drawer,
  Flex,
  Modal,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { AccountForm } from "@containers";
import { useDebounce, useOpen } from "@hooks";
import { SetStateAction, useRef, useState } from "react";

const INITIAL_STATE = {};

type Edit = {
  mode: "edit";
  data: Store.Account;
};

type Create = {
  mode: "create";
  data?: never;
};

type Props = {
  is: boolean;
  onClose: () => void;
} & (Edit | Create);

export const EditAccountDrawer: React.FC<Props> = ({
  is,
  mode,
  onClose,
  data,
}: Props) => {
  const isFormChanged = useRef<boolean>(false);

  const [values, setValues] = useState<Components.Form.Account>(
    INITIAL_STATE as Components.Form.Account
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues((prev) => {
      if (Object.keys(values || {}).length && Object.keys(prev).length) {
        isFormChanged.current = true;
      }

      return values as Components.Form.Account;
    });
  }, 125);

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onCloseHandler = () => {
    onClose();
    isFormChanged.current = false;
    setDebouncedValues(
      INITIAL_STATE as SetStateAction<Components.Form.Account>
    );
  };

  const onTryToClose = (forceClose: boolean = false) => {
    if (!forceClose || typeof forceClose === "object") {
      if (isFormChanged.current) {
        return onOpenConfirmModal();
      } else {
        onCloseHandler();
      }
    } else {
      onCloseHandler();
    }
  };

  const onConfirmClose = () => {
    if (isOpenedConfirmModal) {
      onCloseConfirmModal();
    }

    onCloseHandler();
  };

  return (
    <>
      <Drawer side="right" isOpened={is} onClose={() => onTryToClose(false)}>
        <Drawer.Container>
          <Drawer.Content>
            <Flex full column gap={24} justifyBetween>
              <Flex justifyBetween alignCenter>
                <Drawer.Title>
                  {mode === "create" ? "Create Account" : "Edit account"}
                </Drawer.Title>
                <Drawer.Close onClose={() => onTryToClose(false)} />
              </Flex>
              <Scrollable full overlay>
                <Flex column gap={16}>
                  <AccountForm
                    mode={mode}
                    data={mode === "edit" ? data : (undefined as never)}
                    setValues={setDebouncedValues}
                    onClose={(isForceClose) =>
                      onTryToClose(isForceClose as boolean)
                    }
                  />
                  <Offset padding={[16, 0, 32]}>
                    <Flex column gap={16}>
                      <Text weight={500} as="h4" center>
                        Preview:
                      </Text>
                      <hr />
                      <Flex justifyCenter full>
                        <Account
                          noClick
                          style={{ zIndex: 2 }}
                          data={{
                            amount: +values["account-amount"] || 0,
                            color: values["account-color"] || "",
                            name: values["account-name"] || "",
                            type: "regular",
                            currency:
                              values["account-currency"] ||
                              ("" as Shared.Currencies.CurrencySymbols),
                            deleted: false,
                          }}
                        />
                      </Flex>
                    </Flex>
                  </Offset>
                </Flex>
              </Scrollable>
            </Flex>
          </Drawer.Content>
        </Drawer.Container>
      </Drawer>
      <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
        <Modal.Wrapper>
          <Modal.Container>
            <Modal.Top>
              <Modal.Title>Confirm</Modal.Title>
              <Modal.Subtitle>
                Do you really want to close drawer
              </Modal.Subtitle>
            </Modal.Top>
            <Flex gap={16}>
              <Button onClick={onConfirmClose} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmModal} theme="primary">
                No
              </Button>
            </Flex>
          </Modal.Container>
        </Modal.Wrapper>
      </Modal>
    </>
  );
};
