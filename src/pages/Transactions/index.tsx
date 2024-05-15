import { lazy } from "react";

const LazyComponent = lazy(() => import("./component"));

export const TransactionsPage: React.FC = () => <LazyComponent />;
export { TransactionsFilterBadges } from "./TransactionsFilterBadges";
