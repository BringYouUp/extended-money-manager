import { SuspenseLoader } from "@components";
import { Suspense, lazy } from "react";

const LazyComponent = lazy(() => {
  // return new Promise((resolve) => setTimeout(resolve, 1000)).then(
  //   () => import("./component")
  // );
  return import("./component");
});

export const AccountsPage: React.FC = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <LazyComponent />
    </Suspense>
  );
};
