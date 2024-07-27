import { lazy } from "react";

const LazyComponent = lazy(() => import("./component"));

export const ProfilePage: React.FC = () => <LazyComponent />;
