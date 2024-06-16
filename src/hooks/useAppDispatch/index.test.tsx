import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAppDispatch } from "./useAppDispatch";
import { Provider } from "react-redux";
import { store } from "@store";
import { ReactNode } from "react";

const createWrapper = () => {
  return function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };
};

describe("useAppDispatch", () => {
  it("default check", () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: createWrapper(),
    });

    // act(() => result.current())

    console.log(`→ result`, result);
    expect(typeof result.current).toBe("function");
  });
});
