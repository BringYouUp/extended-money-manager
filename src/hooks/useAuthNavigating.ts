import { PATHS } from "@consts"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useAuthNavigating = () => {
  const navigate = useNavigate()

  const navigateToPlatform = useCallback(() => {
    navigate(PATHS.ROOT)
  }, [navigate])

  const navigateFromPlatform = useCallback(() => {
    navigate(PATHS.LOGIN)
  }, [navigate])

  return { navigateToPlatform, navigateFromPlatform }
}

export default useAuthNavigating