import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAppDispatch } from ".";
import { Provider } from "react-redux";
import { store } from "@store";
import { ReactNode } from "react";
import { USER_SLICES } from "@slices";

describe("useAppDispatch", () => {
  it("default check", () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    expect(typeof result.current).toBe("function");
    expect(typeof result.current(USER_SLICES.clear())).toBe("object");
  });
});
