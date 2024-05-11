import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const [_, set] = useState(0)

  const update = useCallback(() => {
    set(prev => prev + 1)
  }, [])

  return update
}
