"use client";

import StoreProvider from "@providers/store";

type Props = {
	children: React.ReactNode;
};

export function Providers({ children }: Props) {
	return <StoreProvider>{children}</StoreProvider>;
}
