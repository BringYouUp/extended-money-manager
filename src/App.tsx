import { Flex, Offset, Scrollable, Text, Toasts } from "@components";
import { router } from "@router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Scrollable hidden full>
      <Offset
        padding={[4]}
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
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
