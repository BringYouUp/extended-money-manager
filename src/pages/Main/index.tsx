import { userLogOut } from "@async-actions";
import {
  AccountCards,
  Button,
  Categories,
  Flex,
  Grid,
  Icon,
  Offset,
  Scrollable,
  Text,
  Transactions,
} from "@components";
import { useAppDispatch, useModal } from "@hooks";

import styles from "./index.module.css";

import {
  EditAccountDrawer,
  EditCategoryDrawer,
  EditTransactionDrawer,
} from "@containers";
import { useNavigate } from "react-router-dom";
import { cn } from "@utils";

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const [
    isEditAccountDrawerOpened,
    onOpenEditAccountDrawer,
    onCloseEditAccountDrawer,
  ] = useModal();
  const [isCategoryDrawerOpened, onOpenCategoryDrawer, onCloseCategoryDrawer] =
    useModal();
  const [
    isTransactionDrawerOpened,
    onOpenTransactionDrawer,
    onCloseTransactionDrawer,
  ] = useModal();

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(userLogOut());
  };

  const onNavigate =
    (page: "accounts" | "categories" | "transactions") => () => {
      navigate(page);
    };

  return (
    <>
      <Flex full column>
        <Offset padding={[24, 0, 24]}>
          <Flex column gap={12}>
            <Offset padding={[0, 24]}>
              <Flex alignCenter justifyBetween>
                <Flex alignCenter gap={6}>
                  <Text color="var(--text-color-80)" as="h2">
                    Accounts
                  </Text>
                  <Button
                    theme="transparent"
                    rounded
                    onClick={onOpenEditAccountDrawer}
                  >
                    <Icon name="plus" size={16} />
                  </Button>
                </Flex>
                <Text onClick={onNavigate("accounts")} clickable secondary>
                  See all
                </Text>
              </Flex>
            </Offset>
            <Flex center className={styles.containerGradient}>
              <Scrollable
                none
                scroll
                style={{ display: "flex" }}
                className={styles.container}
              >
                <Flex gap={12}>
                  <AccountCards />
                </Flex>
              </Scrollable>
            </Flex>
          </Flex>

          <Flex column gap={12}>
            <Offset padding={[0, 24]}>
              <Flex alignCenter justifyBetween>
                <Flex alignCenter gap={6}>
                  <Text color="var(--text-color-80)" as="h3">
                    Categories
                  </Text>
                  <Button
                    theme="transparent"
                    rounded
                    onClick={onOpenCategoryDrawer}
                  >
                    <Icon name="plus" size={16} />
                  </Button>
                </Flex>
                <Text onClick={onNavigate("categories")} clickable secondary>
                  See all
                </Text>
              </Flex>
            </Offset>
            <Flex className={styles.containerGradient}>
              <Flex wrap gap={12} className={styles.container}>
                <Categories />
              </Flex>
            </Flex>
          </Flex>

          <Flex column gap={12}>
            <Offset padding={[0, 24]}>
              <Flex alignCenter justifyBetween>
                <Flex alignCenter gap={6}>
                  <Text color="var(--text-color-80)" as="h3">
                    Transactions
                  </Text>
                  <Button
                    theme="transparent"
                    rounded
                    onClick={onOpenTransactionDrawer}
                  >
                    <Icon name="plus" size={16} />
                  </Button>
                </Flex>
                <Text onClick={onNavigate("transactions")} clickable secondary>
                  See all
                </Text>
              </Flex>
            </Offset>
            <Flex className={styles.containerGradient}>
              <Grid.Wrap
                templateColumns="repeat(auto-fit, minmax(var(--transaction-list-width), 1fr)"
                gap={12}
                className={cn(styles.container, "w100")}
              >
                <Transactions />
              </Grid.Wrap>
            </Flex>
          </Flex>
          <button onClick={onLogout}>logout</button>
        </Offset>
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
