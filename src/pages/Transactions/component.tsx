import { Flex, Grid, Spinner, Transactions } from "@components";
import { EditTransactionDrawer, SearchTransactionsDrawer } from "@containers";
import { useLoading, useOpen, useSearchTransactions, useToast } from "@hooks";
import { cn } from "@utils";
import { useEffect, useState } from "react";
import { Section } from "src/components/compose/Section";
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
      <Section.Container>
        <Section.Top>
          <Section.Title>
            <Section.Icon name="list" />
            Transactions
            <Section.Icon name="plus" onClick={onOpenTransactionDrawer} />
          </Section.Title>
          <Flex gap={16}>
            {!isFilterEmpty ? (
              <Section.Icon name="trash" onClick={onResetFilter} />
            ) : null}

            {isLoading ? (
              <Spinner size={24} />
            ) : (
              <Section.Icon
                name="search"
                onClick={onOpenSearchTransactionsDrawer}
              />
            )}
          </Flex>
        </Section.Top>
      </Section.Container>
      {!isFilterEmpty ? (
        <Section.Container medium>
          <Flex gap={8}>
            <TransactionsFilterBadges
              onRemove={onUpdateFilterKey}
              data={filterTransactionsParams}
            />
          </Flex>
        </Section.Container>
      ) : null}
      <Section.Container>
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
      </Section.Container>

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
