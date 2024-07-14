//@ts-nocheck

import { Page, Scrollable, SuspenseLoader } from "@components";
import { Suspense } from "react";
import { useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export function UnAuthRoot() {
  const currentOutlet = useOutlet();

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        {
          <Page className="page">
            <Scrollable full overlay>
              <Suspense fallback={<SuspenseLoader />}>{currentOutlet}</Suspense>
            </Scrollable>
          </Page>
        }
      </CSSTransition>
    </SwitchTransition>
  );
}
