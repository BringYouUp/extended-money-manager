import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Modal,
  ModalWrapper,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { AccountForm } from "@containers";
import { AccountCard } from "@components";
import { SetStateAction, useRef, useState } from "react";
import {
  AccountFormFormFields,
  StoreAccountsAccount,
  StoreAccountsAccountCurrencies,
} from "@models";
import { useDebounce, useOpen } from "@hooks";

const INITIAL_STATE = {};

type Edit = {
  mode: "edit";
  data: StoreAccountsAccount;
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

  const [values, setValues] = useState<AccountFormFormFields>(
    INITIAL_STATE as AccountFormFormFields
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues((prev) => {
      if (Object.keys(values || {}).length && Object.keys(prev).length) {
        isFormChanged.current = true;
      }

      return values as AccountFormFormFields;
    });
  }, 125);

  const [isOpenedConfirmModal, onOpenConfirmModal, onCloseConfirmModal] =
    useOpen();

  const onCloseHandler = () => {
    onClose();
    isFormChanged.current = false;
    setDebouncedValues(INITIAL_STATE as SetStateAction<AccountFormFormFields>);
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
        <Container h100 background="var(--soft-background-color)" width="300px">
          <Offset full padding={[24, 16]}>
            <Flex full column gap={24} justifyBetween>
              <Flex justifyBetween alignCenter>
                <Text as="h3" uppercase>
                  {mode === "create" ? "Create Account" : "Edit account"}
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={() => onTryToClose(false)}
                >
                  <Icon size={16} name="close" />
                </Button>
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
                        <AccountCard
                          noClick
                          style={{ zIndex: 2 }}
                          data={{
                            amount: +values["account-amount"] || 0,
                            color: values["account-color"] || "",
                            name: values["account-name"] || "",
                            type: "regular",
                            currency:
                              values["account-currency"] ||
                              ("" as StoreAccountsAccountCurrencies),
                            deleted: false,
                          }}
                        />
                      </Flex>
                    </Flex>
                  </Offset>
                </Flex>
              </Scrollable>
            </Flex>
          </Offset>
        </Container>
      </Drawer>
      <Modal isOpened={isOpenedConfirmModal} onClose={onCloseConfirmModal}>
        <ModalWrapper>
          <Flex column gap={24}>
            <Flex column gap={12}>
              <Text as="h3" uppercase>
                Confirm
              </Text>
              <Text>Do you really want to close drawer</Text>
            </Flex>
            <Flex gap={16}>
              <Button onClick={onConfirmClose} theme="outline">
                Yes
              </Button>
              <Button onClick={onCloseConfirmModal} theme="primary">
                No
              </Button>
            </Flex>
          </Flex>
        </ModalWrapper>
      </Modal>
    </>
  );
};
