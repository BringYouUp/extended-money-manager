import { useAppSelector } from "@hooks";

export const useUID = () => {
  const uid = useAppSelector(state => state.user.user.uid)

  return uid
}
