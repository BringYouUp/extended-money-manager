import { USER_SLICES } from "@slices";
import { store } from "@store";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { useAppDispatch } from ".";

describe("useAppDispatch", () => {
	it("default check", () => {
		const { result } = renderHook(() => useAppDispatch(), {
			wrapper: ({ children }: { children: React.ReactNode }) => (
				<Provider store={store}>{children}</Provider>
			),
		});

		expect(typeof result.current).toBe("function");
		expect(typeof result.current(USER_SLICES.clear())).toBe("object");
	});
});
