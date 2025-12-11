import type { AppStore } from "@store";

declare global {
	interface Window {
		reduxStore: AppStore;
	}
}

export {};
