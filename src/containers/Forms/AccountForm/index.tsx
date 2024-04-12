import { accountsAddAccount, accountsEditAccount } from "@async-actions";
import {
  Button,
  ColorPicker,
  Flex,
  Input,
  Label,
  Spinner,
  Text,
  Unwrap,
} from "@components";

import {
  useAppDispatch,
  useAppSelector,
  useForm,
  useLoading,
  useUID,
} from "@hooks";
import { FormFields, StoreAccountsAccount, UseFormValues } from "@models";
import { ChangeEvent } from "react";

type UseFormFields = "account-name" | "account-amount" | "account-color";

type Props = {
  onClose: (...args: unknown[]) => void;
  setValues: (values: UseFormValues<UseFormFields>) => void;
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

export const AccountForm = ({ data, mode, onClose, setValues }: Props) => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.user.error.message);

  const uid = useUID();

  const { isLoading, startLoading, endLoading, loadingData } =
    useLoading(false);

  const { errors, onChangeForm, onSubmitForm, getValues, formRef } =
    useForm<UseFormFields>(
      ["account-name", "account-amount", "account-color"],
      {
        updateOnChange: {
          value: true,
          callback: (_, values) => setValues(values),
        },
        defaultValues: {
          "account-color": mode === "edit" ? data?.color : "",
          "account-amount": mode === "edit" ? data?.amount : "",
          "account-name": mode === "edit" ? data?.name : "",
        },
      }
    );

  const onSuccessSubmit = () => {
    const values = getValues();

    startLoading({ submitting: true });

    if (mode === "create") {
      dispatch(
        accountsAddAccount({
          account: {
            name: values["account-name"],
            color: values["account-color"],
            type: "regular",
            amount: values["account-amount"],
            currency: "$",
          },
          uid: uid,
        })
      )
        .then(() => onClose())
        .finally(() => endLoading());
    }

    if (mode === "edit") {
      dispatch(
        accountsEditAccount({
          account: {
            name: values["account-name"],
            color: values["account-color"],
            amount: values["account-amount"],
            id: data.id,
          },
          uid,
        })
      )
        .then(() => onClose())
        .finally(() => endLoading());
    }
  };

  const actionManager =
    (type: string) =>
    (...data: unknown[]) => {
      if (isLoading) return;
      switch (type) {
        case "onSuccessSubmit":
          return onSuccessSubmit();
        case "onChangeForm":
          return onChangeForm(
            data[0] as ChangeEvent<HTMLFormElement & FormFields<UseFormFields>>
          );
      }
    };

  return (
    <form
      ref={formRef}
      onChange={actionManager("onChangeForm")}
      onSubmit={onSubmitForm(actionManager("onSuccessSubmit"))}
      className="full-w"
    >
      <Flex w100 column gap={20}>
        <Flex w100 column gap={6}>
          <Label htmlFor="account-name">Account name</Label>
          <Input
            error={Boolean(errors["account-name"])}
            id="account-name"
            name="account-name"
            placeholder="Enter account name..."
          />
          <Unwrap
            visible={Boolean(errors["account-name"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["account-name"]}
            </Text>
          </Unwrap>
        </Flex>
        <Flex w100 column gap={6}>
          <Flex style={{ flex: 1 }} w100 column gap={6}>
            <Label htmlFor="account-amount">Amount </Label>
            <Input
              id="account-amount"
              name="account-amount"
              placeholder="Enter amount..."
              error={Boolean(errors["account-amount"])}
            />
            <Unwrap
              visible={Boolean(errors["account-amount"])}
              negativeOffset="6px"
            >
              <Text size={11} color="var(--text-color-error)">
                {errors["account-amount"]}
              </Text>
            </Unwrap>
          </Flex>
        </Flex>

        <Flex w100 column gap={6}>
          <Label htmlFor="account-color">Color</Label>
          <ColorPicker
            value={mode === "edit" ? data?.color : ""}
            id="account-color"
            name="account-color"
          />
          <Unwrap
            visible={Boolean(errors["account-color"])}
            negativeOffset="6px"
          >
            <Text size={11} color="var(--text-color-error)">
              {errors["account-color"]}
            </Text>
          </Unwrap>
        </Flex>

        <Flex column gap={8}>
          <Unwrap visible={Boolean(message)} negativeOffset="6px">
            <Text size={11} color="var(--text-color-error)">
              {message}
            </Text>
          </Unwrap>
          <Flex column gap={12}>
            <Button type="submit" theme="primary" disabled={isLoading}>
              {isLoading && loadingData.current?.submitting && (
                <Spinner size={16} />
              )}
              <Text uppercase>{mode === "create" ? "Create" : "Update"}</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
