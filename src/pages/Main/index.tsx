import { lazy } from "react";

const LazyComponent = lazy(() => import("./component"));

export const MainPage: React.FC = () => <LazyComponent />;
