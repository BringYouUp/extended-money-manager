import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Flex, Offset, Scrollable, Text, Toasts } from "@components";
import {
  AccountsPage,
  CategoriesPage,
  LoginPage,
  MainPage,
  SignUpPage,
  TransactionsPage,
} from "@pages";
import { PATHS } from "@consts";
import { Root } from "@containers";

const router = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: PATHS.ROOT,
    element: <Root />,

    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: PATHS.ACCOUNTS,
        element: <AccountsPage />,
      },
      {
        path: PATHS.CATEGORIES,
        element: <CategoriesPage />,
      },
      {
        path: PATHS.TRANSACTIONS,
        element: <TransactionsPage />,
      },
      {
        path: PATHS.ANY,
        element: <Navigate to={PATHS.ROOT} />,
      },
    ],
  },
]);

function App() {
  return (
    <Scrollable hidden full>
      <Offset
        padding={[4]}
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          boxShadow: "var(--box-shadow-default)",
          background: "var(--soft-background-color)",
          zIndex: "1",
        }}
      >
        <Flex column gap={2} justifyCenter>
          <Text size={8} uppercase>
            Version {__APP_VERSION__}
          </Text>
          <Text size={8} uppercase>
            Last build at - {__LAST_BUILD_AT__}
          </Text>
        </Flex>
      </Offset>
      <RouterProvider router={router} />
      <Toasts />
    </Scrollable>
  );
}

export default App;
