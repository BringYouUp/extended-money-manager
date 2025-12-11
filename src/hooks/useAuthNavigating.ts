import { PATHS } from "@consts/paths";
import { useNavigate } from "@hooks/useNavigate";
import { useCallback } from "react";

/**
 * Custom hook for handling navigation related to authentication.
 * Uses React's hooks for navigation.
 * - Navigates to the platform's root path.
 * - Navigates from the platform to the authentication login path.
 *
 * @returns An object containing functions to navigate to the platform and from the platform.
 */

export const useAuthNavigating = () => {
	const navigate = useNavigate();

	const navigateToPlatform = useCallback(() => {
		navigate(PATHS.ROOT);
	}, [navigate]);

	const navigateFromPlatform = useCallback(() => {
		navigate(`${PATHS.AUTH}${PATHS.LOGIN}`);
	}, [navigate]);

	return { navigateToPlatform, navigateFromPlatform };
};
