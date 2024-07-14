import { Flex, Form, Select, SelectOption } from "@components";
import {
  TransactionIncomeWithdrawalForm,
  TransactionTransferForm,
} from "@containers";
import { useState } from "react";

type Props = {
  onClose: (...args: unknown[]) => void;
  isFormChanged: React.MutableRefObject<boolean>;
} & Components.Form.TransactionProps;

export const TransactionForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  isFormChanged,
  onClose,
}: Props) => {
  const [transactionType, setTransactionType] =
    useState<Store.TransactionType | null>(() => {
      if (mode === "edit") {
        return data.type;
      } else {
        return initialValues?.type || null;
      }
    });

  return (
    <Form.Items>
      <Form.Item htmlFor="transaction-account-id" label="Transaction type">
        <Select<{
          name: Capitalize<Store.TransactionType>;
          value: Store.TransactionType;
        }>
          disabled={mode === "edit"}
          mode="single"
          placeholder="Select type..."
          name="transaction-type"
          items={[
            { name: "Withdraw", value: "withdraw" },
            { name: "Income", value: "income" },
            { name: "Transfer", value: "transfer" },
          ]}
          parseItem={(item) => item.name}
          selectedCallback={(type) => type.value === transactionType}
          onChangeValue={(e) => {
            setTransactionType(e.value);
          }}
          Component={SelectOption}
          Wrapper={({ children }) => (
            <Flex style={{ width: "264px", padding: "4px 0px" }} column>
              {children}
            </Flex>
          )}
        />
      </Form.Item>
      {(transactionType === "income" || transactionType === "withdraw") && (
        <TransactionIncomeWithdrawalForm
          mode={mode}
          onClose={onClose}
          initialValues={
            mode === "create" ? initialValues : (undefined as never)
          }
          data={mode === "edit" ? data : (undefined as never)}
          transactionType={transactionType}
          isFormChanged={isFormChanged}
        />
      )}
      {transactionType === "transfer" && (
        <TransactionTransferForm
          mode={mode}
          onClose={onClose}
          initialValues={
            mode === "create" ? initialValues : (undefined as never)
          }
          data={mode === "edit" ? data : (undefined as never)}
          isFormChanged={isFormChanged}
        />
      )}
    </Form.Items>
  );
};
