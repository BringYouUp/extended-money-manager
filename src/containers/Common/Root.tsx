import { Flex, Scrollable, Spinner } from "@components";
import { useAppSelector, useAuthListening, useAuthNavigating } from "@hooks";

import { Outlet } from "react-router-dom";

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

  return (
    <Scrollable full overlay>
      <Outlet />
    </Scrollable>
  );
};
