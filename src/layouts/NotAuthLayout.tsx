"use client";

import SuspenseLoader from "@entities/SuspenseLoader";
import { Page, Scrollable } from "@ui";
import { Suspense } from "react";

export function NotAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Page>
			<Scrollable full overlay>
				<Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
			</Scrollable>
		</Page>
	);
}
