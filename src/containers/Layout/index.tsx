import { Flex, Scrollable, SuspenseLoader } from "@components";
import { Sidebar } from "@containers";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <Scrollable full hidden>
      <Flex full gap={0}>
        <Sidebar />
        <Scrollable full overlay>
          <Suspense fallback={<SuspenseLoader />}>
            <Outlet />
          </Suspense>
        </Scrollable>
      </Flex>
    </Scrollable>
  );
};
