"use client";

import SuspenseLoader from "@entities/SuspenseLoader";
import dynamic from "next/dynamic";

const LazyComponent = dynamic(() => import("src/_pages/Profile"), {
	loading: () => <SuspenseLoader />,
});

export function ClientPage() {
	return <LazyComponent />;
}
