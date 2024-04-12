import {
  Button,
  Container,
  Drawer,
  Flex,
  Icon,
  Offset,
  Text,
} from "@components";
import { AccountForm } from "@containers";
import { AccountCard } from "@components";
import { SetStateAction, useState } from "react";
import { StoreAccountsAccount, UseFormValues } from "@models";
import { useDebounce } from "@hooks";

type Props = {
  is: boolean;
  onClose: () => void;
} & (
  | {
      mode: "edit";
      data: StoreAccountsAccount;
    }
  | {
      mode: "create";
      data?: never;
    }
);

export const AccountDrawer: React.FC<Props> = ({
  is,
  mode,
  onClose,
  data,
}: Props) => {
  const [values, setValues] = useState<
    UseFormValues<"account-amount" | "account-color" | "account-name">
  >({});

  const setDebouncedValues = useDebounce((values) => {
    setValues(
      values as SetStateAction<
        UseFormValues<"account-name" | "account-amount" | "account-color">
      >
    );
  }, 125);

  console.log(`→ values`, values);

  return (
    <Drawer side="right" isOpened={is} onClose={onClose}>
      <Container h100 background="var(--soft-background-color)" width="300px">
        <Offset padding={[16]}>
          <Flex column gap={16} justifyBetween>
            <Flex justifyBetween alignCenter>
              <Text as="h3">
                {mode === "create" ? "Create Account" : "Edit account"}
              </Text>
              <Button theme="transparent" rounded onClick={onClose}>
                <Icon name="close" />
              </Button>
            </Flex>
            <AccountForm
              mode={mode}
              data={mode === "edit" ? data : (undefined as never)}
              setValues={setDebouncedValues}
              onClose={onClose}
            />
            <hr />
            <Offset margin={[12, 0, 0, 0]}>
              <Text weight={500} as="h4" center>
                Preview:
              </Text>
            </Offset>
            <AccountCard
              noClick
              style={{ zIndex: 2 }}
              data={{
                amount: values?.["account-amount"] || "",
                color: values["account-color"] || "",
                name: values["account-name"] || "",
                type: "regular",
                currency: "$",
              }}
            />
          </Flex>
        </Offset>
      </Container>
    </Drawer>
  );
};
