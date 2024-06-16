import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useOpen } from '.'

describe('useOpen', () => {
  it('default value', () => {
    const initialValue = true;
    const { result } = renderHook(() => useOpen(initialValue));

    expect(result.current[0]).toBe(initialValue);
  });
  it('onOpen case', () => {
    const { result } = renderHook(() => useOpen());

    expect(result.current[0]).toBe(false);

    act(() => result.current[1]())
    expect(result.current[0]).toBe(true);
  });
  it('open and close cases', () => {
    const { result } = renderHook(() => useOpen());
    const [, onOpen, onClose] = result.current

    expect(result.current[0]).toBe(false);

    act(() => onOpen())
    expect(result.current[0]).toBe(true);

    act(() => onClose())
    expect(result.current[0]).toBe(false);
  });
});
