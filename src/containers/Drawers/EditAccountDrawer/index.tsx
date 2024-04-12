import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Scrollable,
  Text,
} from "@components";
import { AccountForm } from "@containers";
import { AccountCard } from "@components";
import { SetStateAction, useState } from "react";
import {
  AccountFormFormFields,
  StoreAccountsAccount,
  StoreAccountsAccountCurrencies,
} from "@models";
import { useDebounce } from "@hooks";

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
  const [values, setValues] = useState<AccountFormFormFields>(
    {} as AccountFormFormFields
  );

  const setDebouncedValues = useDebounce((values) => {
    setValues(values as SetStateAction<AccountFormFormFields>);
  }, 125);

  return (
    <Drawer side="right" isOpened={is} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="300px">
        <Offset full padding={[16]}>
          <Flex full column gap={16} justifyBetween>
            <Flex justifyBetween alignCenter>
              <Text as="h3">
                {mode === "create" ? "Create Account" : "Edit account"}
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Flex>
            <Scrollable full overlay>
              <Flex column gap={16}>
                <AccountForm
                  mode={mode}
                  data={mode === "edit" ? data : (undefined as never)}
                  setValues={setDebouncedValues}
                  onClose={onClose}
                />
                <Offset padding={[16, 0]}>
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
                          amount: +values?.["account-amount"] || 0,
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
  );
};
