import { userLogOut } from "@async-actions";
import {
  AccountCards,
  Button,
  Categories,
  Flex,
  Icon,
  Offset,
  Spinner,
  Text,
} from "@components";
import {
  useAppDispatch,
  useAppSelector,
  useAuthListening,
  useAuthNavigating,
  useModal,
} from "@hooks";

import styles from "./index.module.css";

import { AccountDrawer, CategoryDrawer } from "@containers";

export const Component: React.FC = () => {
  const isAuthLoading = useAuthListening();

  const [isAccountDrawerOpened, onOpenAccountDrawer, onCloseAccountDrawer] =
    useModal();
  const [isCategoryDrawerOpened, onOpenCategoryDrawer, onCloseCategoryDrawer] =
    useModal();

  const { navigateFromPlatform } = useAuthNavigating();
  const user = useAppSelector((state) => state.user.user.uid);

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(userLogOut());
  };

  if (isAuthLoading) {
    return (
      <Flex full center>
        <Spinner size={24} />
      </Flex>
    );
  }

  if (!user) {
    navigateFromPlatform();
    return;
  }

  return (
    <>
      <Flex full column>
        <Offset padding={[24, 0, 24]}>
          <Flex column gap={12}>
            <Offset padding={[0, 24]}>
              <Flex alignCenter justifyBetween>
                <Text color="var(--text-color-80)" as="h2">
                  Accounts
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={onOpenAccountDrawer}
                >
                  <Icon name="plus" size={16} fill="var(--text-color-80)" />
                </Button>
              </Flex>
            </Offset>
            <Flex className={styles.container2}>
              <Flex gap={12} className={styles.container}>
                <AccountCards />
              </Flex>
            </Flex>
          </Flex>

          <Flex column gap={12}>
            <Offset padding={[0, 24]}>
              <Flex alignCenter justifyBetween>
                <Text color="var(--text-color-80)" as="h3">
                  Categories
                </Text>
                <Button
                  theme="transparent"
                  rounded
                  onClick={onOpenCategoryDrawer}
                >
                  <Icon name="plus" size={16} fill="var(--text-color-80)" />
                </Button>
              </Flex>
            </Offset>
            <Flex className={styles.container2}>
              <Flex wrap gap={12} className={styles.container}>
                <Categories />
              </Flex>
            </Flex>
          </Flex>
          <button onClick={onLogout}>logout</button>
        </Offset>
      </Flex>
      <AccountDrawer
        mode="create"
        is={isAccountDrawerOpened}
        onClose={onCloseAccountDrawer}
      />
      <CategoryDrawer
        mode="create"
        is={isCategoryDrawerOpened}
        onClose={onCloseCategoryDrawer}
      />
    </>
  );
};
