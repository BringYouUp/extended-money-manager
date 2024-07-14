import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useForceUpdate } from ".";

describe("useForceUpdate", () => {
  it("default check", () => {
    const { result } = renderHook(() => useForceUpdate());

    act(() => result.current());

    expect(typeof result.current).toBe("function");
  });
});
