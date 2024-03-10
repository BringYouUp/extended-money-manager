import { Flex, Spinner } from "../../components";
import {
  useAppDispatch,
  useAuthListening,
  useAuthNavigating,
  useAppSelector,
} from "../../hooks";
import { userLogOut } from "../../store/asyncActions";

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
