import { lazy } from "react";

const LazyComponent = lazy(() => import("./component"));

export const CategoriesPage: React.FC = () => <LazyComponent />;
