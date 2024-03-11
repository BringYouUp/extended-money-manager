import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Flex, Offset, Text } from "@components";
import { LoginPage, Main, SignUp } from "@pages";
import { Root } from "@containers";
import { PATHS } from "@consts";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Root />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: PATHS.ROOT,
        element: <Main />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Offset
        padding={[4]}
        style={{
          position: "fixed",
          left: "0",
          top: "o",
          boxShadow: "var(--box-shadow-default)",
          background: "var(--soft-background-color)",
        }}
      >
        <Flex alignCenter>
          <Text size={8} uppercase>
            Last build at - {__LAST_BUILD_AT__}
          </Text>
        </Flex>
      </Offset>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
