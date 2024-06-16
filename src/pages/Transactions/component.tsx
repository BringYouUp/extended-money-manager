import {
  Button,
  Flex,
  Grid,
  Icon,
  Spinner,
  Text,
  Transactions,
} from "@components";
import { EditTransactionDrawer, SearchTransactionsDrawer } from "@containers";
import { useLoading, useOpen, useSearchTransactions, useToast } from "@hooks";

import { cn } from "@utils";
import { useEffect, useState } from "react";
import { TransactionsFilterBadges } from "src/pages/Transactions";

const Component: React.FC = () => {
  const { isLoading, startLoading, endLoading } = useLoading();
  const { createToast } = useToast();
  const {
    filterTransactionsParams,
    isFilterEmpty,
    onUpdateFilterKey,
    onUpdateFilter,
    onResetFilter,
    onFilter,
  } = useSearchTransactions();
  const [transactions, setTransactions] = useState<Store.Transaction[]>([]);

  const [
    isTransactionDrawerOpened,
    onOpenTransactionDrawer,
    onCloseTransactionDrawer,
  ] = useOpen();

  const [
    isSearchTransactionsDrawerOpened,
    onOpenSearchTransactionsDrawer,
    onCloseSearchTransactionsDrawer,
  ] = useOpen();

  const onSearch = (data: Hooks.UseFilterTransactions.FilterModel) => {
    onCloseSearchTransactionsDrawer();
    onUpdateFilter(data);
  };

  const onFilterTransactions = () => {
    startLoading({ filtering: true });
    onFilter()
      .then((data) => setTransactions(data))
      .catch((e) => createToast(e.message, "error"))
      .finally(() => endLoading());
  };

  useEffect(() => {
    onFilterTransactions();
  }, [filterTransactionsParams]);

  return (
    <>
      <Flex className={cn("containerBlock")}>
        <Flex justifyBetween gap={10} alignCenter>
          <Text color="var(--text-color-70)" as="h2" uppercase>
            <Flex alignCenter gap={10}>
              <Icon size={24} name="list" />
              Transactions
              <Button
                theme="transparent"
                rounded
                onClick={onOpenTransactionDrawer}
              >
                <Icon name="plus" size={24} fill="var(--text-color-40)" />
              </Button>
            </Flex>
          </Text>
          <Flex gap={16}>
            {!isFilterEmpty ? (
              <Button theme="transparent" rounded onClick={onResetFilter}>
                <Icon size={24} name="trash" />
              </Button>
            ) : null}
            <Button
              theme="transparent"
              rounded
              onClick={onOpenSearchTransactionsDrawer}
            >
              {isLoading ? (
                <Spinner size={24} />
              ) : (
                <Icon name="search" size={24} />
              )}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {!isFilterEmpty ? (
        <Flex className={cn("containerBlock containerBlock--medium")}>
          <Flex gap={8}>
            <TransactionsFilterBadges
              onRemove={onUpdateFilterKey}
              data={filterTransactionsParams}
            />
          </Flex>
        </Flex>
      ) : null}
      <Flex className={cn("containerBlock")}>
        <Grid.Wrap
          templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
          gap={12}
          className={cn("w100")}
        >
          <Transactions
            isPending={isLoading}
            transactions={transactions}
            withAdd={false}
            countTransactions={Infinity}
            countPlaceholders={7}
          />
        </Grid.Wrap>
      </Flex>

      <EditTransactionDrawer
        mode="create"
        is={isTransactionDrawerOpened}
        onClose={onCloseTransactionDrawer}
      />
      <SearchTransactionsDrawer
        is={isSearchTransactionsDrawerOpened}
        onClose={onCloseSearchTransactionsDrawer}
        onSearch={onSearch}
        filter={filterTransactionsParams}
      />
    </>
  );
};

export default Component;
