import { lazy } from "react";

const LazyComponent = lazy(() => {
  return import("./component");
  // return new Promise((resolve) => setTimeout(resolve, 2000)).then(
  //   () => import("./component")
  // );
});

export const AccountsPage: React.FC = () => <LazyComponent />;
