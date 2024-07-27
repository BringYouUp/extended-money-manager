import { useMemo } from "react";

import { useAppSelector } from "@hooks/useAppSelector";

import { EditTransactionDrawer } from "@features/Drawers";
import { useOpen } from "@hooks/useOpen";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";
import Components from "./components";

type Props = {
  data: Store.Transaction | Omit<Store.Transaction, "id" | "createdAt">;
  style?: React.CSSProperties;
  noClick?: boolean;
};

export function Transaction({ noClick, data, style }: Props) {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);
  const categories = useAppSelector(
    CATEGORY_SELECTOR.visibleCategoriesSelector
  );
  const [isOpened, onOpen, onClose] = useOpen();

  const onOpenHandler = () => {
    if (noClick) return;
    onOpen();
  };

  const category = useMemo(() => {
    return categories.find((category) => category.id === data.categoryId);
  }, [data, categories]);

  const account = useMemo(() => {
    return accounts.find((account) => account.id === data.accountId);
  }, [data, accounts]);

  return (
    <>
      <Transaction.Wrap style={style} type={data.type} onClick={onOpenHandler}>
        {(data.type === "income" || data.type === "withdraw") && (
          <Transaction.IncomeWithdrawal
            account={account}
            category={category}
            data={data}
          />
        )}

        {data.type === "transfer" && <Transaction.Transfer data={data} />}
      </Transaction.Wrap>
      <EditTransactionDrawer
        is={isOpened}
        onClose={onClose}
        data={data as Store.Transaction}
        mode="edit"
      />
    </>
  );
}

Transaction.Icon = Components.TransactionIcon;
Transaction.Description = Components.TransactionDescription;
Transaction.SubInfo = Components.TransactionSubInfo;
Transaction.Wrap = Components.TransactionWrap;
Transaction.Info = Components.TransactionInfo;
Transaction.Content = Components.TransactionContent;
Transaction.IncomeWithdrawal = Components.TransactionIncomeWithdrawal;
Transaction.Transfer = Components.TransactionTransfer;
