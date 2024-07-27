import { useAppSelector } from "@hooks/useAppSelector";
import { useAuthListening } from "@hooks/useAuthListening";
import { useAuthNavigating } from "@hooks/useAuthNavigating";
import { Flex, Spinner } from "@ui";
import { Layout } from "../../features";

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
