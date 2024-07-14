import {
  Accounts,
  Categories,
  Flex,
  Grid,
  Scrollable,
  Transactions,
} from "@components";
import {
  EditAccountDrawer,
  EditCategoryDrawer,
  EditTransactionDrawer,
} from "@containers";
import { useAppSelector, useOpen } from "@hooks";
import { TRANSACTION_SELECTOR } from "@selectors";
import { cn } from "@utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Section } from "src/components/compose/Section";
import styles from "./index.module.css";

export const Component: React.FC = () => {
  const navigate = useNavigate();

  const [
    isEditAccountDrawerOpened,
    onOpenEditAccountDrawer,
    onCloseEditAccountDrawer,
  ] = useOpen();
  const [isCategoryDrawerOpened, onOpenCategoryDrawer, onCloseCategoryDrawer] =
    useOpen();
  const [
    isTransactionDrawerOpened,
    onOpenTransactionDrawer,
    onCloseTransactionDrawer,
  ] = useOpen();

  const transactions = useAppSelector(
    TRANSACTION_SELECTOR.visibleTransactionsSelector
  );

  const onNavigate =
    (page: "accounts" | "categories" | "transactions") => () => {
      navigate(page);
    };

  useEffect(() => {}, []);

  return (
    <>
      <Flex full column>
        <Section.Container>
          <Section.Top>
            <Section.Title>
              <Section.Icon name="bank-card" />
              Accounts
              <Section.Icon onClick={onOpenEditAccountDrawer} name="plus" />
            </Section.Title>

            <Section.Icon onClick={onNavigate("accounts")} name="arrow-right" />
          </Section.Top>

          <Flex center className={styles.containerGradient}>
            <Scrollable
              none
              scroll
              style={{ display: "flex" }}
              className={cn(styles.container, "w100")}
            >
              <Flex gap={12}>
                <Accounts />
              </Flex>
            </Scrollable>
          </Flex>
        </Section.Container>

        <Section.Container>
          <Section.Top>
            <Section.Title>
              <Section.Icon name="category" />
              Categories
              <Section.Icon name="plus" onClick={onOpenCategoryDrawer} />
            </Section.Title>
            <Section.Icon
              name="arrow-right"
              onClick={onNavigate("categories")}
            />
          </Section.Top>

          <Flex>
            <Flex wrap gap={12}>
              <Categories />
            </Flex>
          </Flex>
        </Section.Container>

        <Section.Container>
          <Section.Top>
            <Section.Title>
              <Section.Icon name="list" />
              Transactions
              <Section.Icon name="plus" onClick={onOpenTransactionDrawer} />
            </Section.Title>
            <Section.Icon
              name="arrow-right"
              onClick={onNavigate("transactions")}
            />
          </Section.Top>

          <Grid.Wrap
            templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
            gap={12}
            className={cn("w100")}
          >
            <Transactions
              transactions={transactions}
              withAdd={true}
              countTransactions={7}
              countPlaceholders={7}
            />
          </Grid.Wrap>
        </Section.Container>
      </Flex>

      <EditAccountDrawer
        mode="create"
        is={isEditAccountDrawerOpened}
        onClose={onCloseEditAccountDrawer}
      />
      <EditCategoryDrawer
        mode="create"
        is={isCategoryDrawerOpened}
        onClose={onCloseCategoryDrawer}
      />
      <EditTransactionDrawer
        mode="create"
        is={isTransactionDrawerOpened}
        onClose={onCloseTransactionDrawer}
      />
    </>
  );
};

export default Component;
