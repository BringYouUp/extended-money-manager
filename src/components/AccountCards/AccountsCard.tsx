import {
  AccountCard,
  AccountCardEmpty,
  Flex,
  Skeleton,
  Text,
} from "@components";
import { useAppSelector } from "@hooks";
import styles from "./index.module.css";
import { ACCOUNT_SELECTOR } from "@selectors";

export const AccountCards: React.FC = () => {
  const accounts = useAppSelector(ACCOUNT_SELECTOR.visibleAccountsSelector);
  const status = useAppSelector((state) => state.accounts.status);

  if (status === "accounts/accountsSetAccounts/pending") {
    return new Array(8).fill(null).map((_, index) => {
      return <Skeleton key={index} className={styles.account} />;
    });
  }

  if (accounts.length === 0) {
    return (
      <Flex w100 center column gap={8}>
        <Text as="h4">You have not any account</Text>
        <AccountCardEmpty />
      </Flex>
    );
  }

  return (
    <>
      {accounts.map((account) => (
        <AccountCard key={account.id} data={account} />
      ))}
      <AccountCardEmpty />
    </>
  );
};
