/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Custom React hook that returns a function to force a re-render when called.
 * @returns {Function} The update function to trigger a re-render.
 */

import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const [_, set] = useState(0);

  const update = useCallback(() => {
    set((prev) => prev + 1);
  }, []);

  return update;
};
