import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INITIAL_LOADING_DATA, useLoading } from '.'

describe('useLoading', () => {
  const loadingData = { init: 'TEST-DATA' }

  it('default loading state and data', () => {
    const initialLoadingState = true;
    const { result } = renderHook(() => useLoading(initialLoadingState, loadingData));

    expect(result.current.isLoading).toBe(initialLoadingState)
    expect(result.current.loadingData.current?.init).toBe(loadingData.init)
  });

  it('start loading', () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.loadingData.current).toBe(INITIAL_LOADING_DATA)

    act(() => result.current.startLoading(loadingData))
    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadingData.current?.init).toBe(loadingData.init)
  });

  it('start and end loading cases', () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.loadingData.current).toBe(INITIAL_LOADING_DATA)

    act(() => result.current.startLoading(loadingData))
    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadingData.current?.init).toBe(loadingData.init)

    act(() => result.current.endLoading())
    expect(result.current.isLoading).toBe(false)
    expect(result.current.loadingData.current).toEqual({})
  });
});
