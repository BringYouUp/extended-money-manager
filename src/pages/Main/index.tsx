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
import { useAppDispatch, useOpen } from "@hooks";

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

  const onCurrency = () => {
    return;
  };

  return (
    <>
      <Flex full column>
        <Offset padding={[24, 0, 24]}>
          <Flex column gap={16}>
            <Flex column gap={20}>
              <Offset padding={[0, 24]}>
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
                        <Icon
                          name="plus"
                          size={24}
                          fill="var(--text-color-40)"
                        />
                      </Button>
                    </Flex>
                  </Text>
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

            <Flex column gap={20}>
              <Offset padding={[0, 24]}>
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
                        <Icon
                          name="plus"
                          size={24}
                          fill="var(--text-color-40)"
                        />
                      </Button>
                    </Flex>
                  </Text>
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

            <Flex column gap={20}>
              <Offset padding={[0, 24]}>
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
                        <Icon
                          name="plus"
                          size={24}
                          fill="var(--text-color-40)"
                        />
                      </Button>
                    </Flex>
                  </Text>
                  <Text
                    onClick={onNavigate("transactions")}
                    clickable
                    secondary
                  >
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
          </Flex>
          <button onClick={onLogout}>logout</button>
          <button onClick={onCurrency}>currency</button>
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
