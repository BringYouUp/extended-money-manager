import { userLogOut } from "@async-actions";
import { Flex, Spinner } from "@components";
import {
  useAppDispatch,
  useAppSelector,
  useAuthListening,
  useAuthNavigating,
} from "@hooks";

export const Component: React.FC = () => {
  const isAuthLoading = useAuthListening();

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
    <Flex full center>
      <button onClick={onLogout}>Logout</button>
    </Flex>
  );
};
