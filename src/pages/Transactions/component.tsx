import { Button, Flex, Grid, Icon, Text, Transactions } from "@components";
import { EditTransactionDrawer, SearchTransactionsDrawer } from "@containers";
import { useOpen } from "@hooks";
import { cn } from "@utils";

const Component: React.FC = () => {
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
            <Button
              theme="transparent"
              rounded
              onClick={onOpenSearchTransactionsDrawer}
            >
              <Icon name="search" size={24} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex className={cn("containerBlock")}>Hi</Flex>
      <Flex className={cn("containerBlock")}>
        <Grid.Wrap
          templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
          gap={12}
          className={cn("w100")}
        >
          <Transactions withAdd={false} all={true} />
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
      />
    </>
  );
};

export default Component;
