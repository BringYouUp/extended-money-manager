import { Flex, Page, Scrollable, SuspenseLoader } from "@ui";
import { Suspense } from "react";
import { useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Sidebar } from "../../features";

export function Layout() {
  const currentOutlet = useOutlet();

  return (
    <Scrollable full hidden>
      <Flex full gap={0}>
        <Sidebar />
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {
              <Page style={{ width: "calc(100% - 72px)" }}>
                <Scrollable full overlay>
                  <Suspense fallback={<SuspenseLoader />}>
                    {currentOutlet}
                  </Suspense>
                </Scrollable>
              </Page>
            }
          </CSSTransition>
        </SwitchTransition>
      </Flex>
    </Scrollable>
  );
}
