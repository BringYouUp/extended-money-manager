import { AccountCard, AccountCardEmpty } from "@components";
import { useAppSelector } from "@hooks";

export const AccountCards: React.FC = () => {
  const accounts = useAppSelector((state) => state.accounts.accounts);

  return (
    <>
      {accounts.map((account) => (
        <AccountCard key={account.id} data={account} />
      ))}
      <AccountCardEmpty />
    </>
  );
};
