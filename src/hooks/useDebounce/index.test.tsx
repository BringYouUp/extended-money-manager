import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDebounce } from ".";

describe("useDebounce", () => {
  it("default check", () => {
    const callback = vi.fn(() => {});
    const delay = 500;

    vi.useFakeTimers();
    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => result.current());
    expect(callback).not.toBeCalled();

    act(() => vi.advanceTimersByTime(delay));
    expect(callback).toBeCalled();
  });

  it("clear previous timer", () => {
    const callback = vi.fn(() => {});
    const delay = 500;

    vi.useFakeTimers();
    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current();
      vi.advanceTimersByTime(delay / 2);
      result.current();
    });
    expect(callback).not.toBeCalled();

    act(() => vi.advanceTimersByTime(delay / 2));
    expect(callback).not.toBeCalled();

    act(() => vi.advanceTimersByTime(delay));
    expect(callback).toBeCalled();
  });

  it("change delay", () => {
    const callback = vi.fn(() => {});
    const delayHalfSecond = 500;
    const delaySecond = 1000;

    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ callback, delay }) => useDebounce(callback, delay),
      {
        initialProps: {
          callback,
          delay: delaySecond,
        },
      },
    );

    act(() => result.current());
    expect(callback).not.toBeCalled();

    rerender({
      callback,
      delay: delayHalfSecond,
    });

    act(() => result.current());
    expect(callback).not.toBeCalled();

    act(() => vi.advanceTimersByTime(500));
    expect(callback).toBeCalled();
  });
});
