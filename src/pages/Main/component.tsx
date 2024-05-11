import { userLogOut } from "@async-actions";
import {
  AccountCards,
  Button,
  Categories,
  Flex,
  Grid,
  Icon,
  Scrollable,
  Text,
  Transactions,
} from "@components";
import { useAppDispatch, useOpen } from "@hooks";

import styles from "./index.module.css";

import {
  EditAccountDrawer,
  EditCategoryDrawer,
  EditTransactionDrawer,
} from "@containers";
import { useNavigate } from "react-router-dom";
import { cn } from "@utils";
import { useEffect } from "react";

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

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(userLogOut());
  };

  const onNavigate =
    (page: "accounts" | "categories" | "transactions") => () => {
      navigate(page);
    };

  useEffect(() => {}, []);

  return (
    <>
      <Flex full column>
        <Flex column gap={0}>
          <Flex className={cn("containerBlock")}>
            <Flex alignCenter justifyBetween>
              <Text color="var(--text-color-70)" as="h2" uppercase>
                <Flex alignCenter gap={10}>
                  <Icon size={24} name="bank-card" />
                  Accounts
                  <Button
                    theme="transparent"
                    rounded
                    onClick={onOpenEditAccountDrawer}
                  >
                    <Icon name="plus" size={24} fill="var(--text-color-40)" />
                  </Button>
                </Flex>
              </Text>
              <Text onClick={onNavigate("accounts")} clickable secondary>
                See all
              </Text>
            </Flex>

            <Flex center className={styles.containerGradient}>
              <Scrollable
                none
                scroll
                style={{ display: "flex" }}
                className={cn(styles.container, "w100")}
              >
                <Flex gap={12}>
                  <AccountCards />
                </Flex>
              </Scrollable>
            </Flex>
          </Flex>

          <Flex className={cn("containerBlock")}>
            <Flex alignCenter justifyBetween>
              <Text color="var(--text-color-70)" as="h2" uppercase>
                <Flex alignCenter gap={10}>
                  <Icon size={24} name="category" />
                  Categories
                  <Button
                    theme="transparent"
                    rounded
                    onClick={onOpenCategoryDrawer}
                  >
                    <Icon name="plus" size={24} fill="var(--text-color-40)" />
                  </Button>
                </Flex>
              </Text>
              <Text onClick={onNavigate("categories")} clickable secondary>
                See all
              </Text>
            </Flex>

            <Flex>
              <Flex wrap gap={12}>
                <Categories />
              </Flex>
            </Flex>
          </Flex>

          <Flex className={cn("containerBlock")}>
            <Flex alignCenter justifyBetween>
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
              <Text onClick={onNavigate("transactions")} clickable secondary>
                See all
              </Text>
            </Flex>

            <Grid.Wrap
              templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
              gap={12}
              className={cn("w100")}
            >
              <Transactions withAdd={true} count={7} />
            </Grid.Wrap>
          </Flex>
        </Flex>
        <button onClick={onLogout}>logout</button>
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
