import { useCallback, useState } from "react";

export const useOpen = (
  initialState: boolean = false,
): [boolean, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);

  const onOpen = useCallback(() => setIsVisible(true), []);
  const onClose = useCallback(() => setIsVisible(false), []);

  return [isVisible, onOpen, onClose];
};
