"use client";

import { type AppStore, store } from "@store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>(undefined as unknown as AppStore);

	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = store;

		if (typeof window !== "undefined") {
			if (process.env.NODE_ENV === "development") {
				window.reduxStore = storeRef.current;
			}
		}
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
