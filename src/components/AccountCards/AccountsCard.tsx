import { AccountCard, AccountCardEmpty, Skeleton } from "@components";
import { useAppSelector } from "@hooks";
import styles from "./index.module.css";

export const AccountCards: React.FC = () => {
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const status = useAppSelector((state) => state.accounts.status);

  if (status === "accounts/accountsSetAccounts/pending") {
    return new Array(8).fill(null).map((_, index) => {
      return <Skeleton key={index} className={styles.wrapper} />;
    });
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
