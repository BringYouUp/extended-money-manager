import { Flex, Spinner } from "@components";
import { Layout } from "@containers";
import { useAppSelector, useAuthListening, useAuthNavigating } from "@hooks";

export const Root: React.FC = () => {
  const isAuthLoading = useAuthListening();

  const { navigateFromPlatform } = useAuthNavigating();
  const user = useAppSelector((state) => state.user.user.uid);

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

  return <Layout />;
};
