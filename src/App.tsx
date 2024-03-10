import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PATHS } from "./consts/paths.js";
import { Root } from "./containers";
import * as PAGES from "./pages";
import { Flex, Offset, Text } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Root />,
    children: [
      {
        path: PATHS.LOGIN,
        element: <PAGES.LoginPage />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <PAGES.SignUp />,
      },
      {
        path: PATHS.ROOT,
        element: <PAGES.Main />,
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
