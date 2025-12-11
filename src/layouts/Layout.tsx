"use client";

import SuspenseLoader from "@entities/SuspenseLoader";
import { Flex, Page, Scrollable } from "@ui";
import { Sidebar } from "@widgets/Sidebar";
import { Suspense } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Scrollable full hidden>
			<Flex full gap={0}>
				<Sidebar />
				<Page style={{ width: "calc(100% - 72px)" }}>
					<Scrollable full overlay>
						<Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
					</Scrollable>
				</Page>
			</Flex>
		</Scrollable>
	);
}
