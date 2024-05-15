import { Flex, Label, Select, SelectOption } from "@components";
import {
  TransactionIncomeWithdrawalForm,
  TransactionTransferForm,
} from "@containers";

import {
  StoreTransactionsTransactionType,
  TransactionFormProps,
} from "@models";
import { useState } from "react";

type Props = {
  onClose: (...args: unknown[]) => void;
  isFormChanged: React.MutableRefObject<boolean>;
} & TransactionFormProps;

export const TransactionForm: React.FC<Props> = ({
  data,
  initialValues,
  mode,
  isFormChanged,
  onClose,
}: Props) => {
  const [transactionType, setTransactionType] =
    useState<StoreTransactionsTransactionType | null>(() => {
      if (mode === "edit") {
        return data.type;
      } else {
        return initialValues?.type || null;
      }
    });

  return (
    <Flex w100 column gap={20}>
      <Flex w100 column gap={6}>
        <Flex style={{ flex: 1 }} w100 column gap={6}>
          <Label htmlFor="transaction-account-id">Transaction type</Label>
          <Select<{
            name: Capitalize<StoreTransactionsTransactionType>;
            value: StoreTransactionsTransactionType;
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
            onChange={(e) => {
              setTransactionType(e.value);
            }}
            Component={SelectOption}
            Wrapper={({ children }) => (
              <Flex style={{ width: "264px", padding: "4px 0px" }} column>
                {children}
              </Flex>
            )}
          />
        </Flex>
      </Flex>
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
    </Flex>
  );
};
