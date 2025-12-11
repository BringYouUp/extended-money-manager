"use client";

import { useAppSelector } from "@hooks/useAppSelector";
import { useAuthListening } from "@hooks/useAuthListening";
import { useAuthNavigating } from "@hooks/useAuthNavigating";
import { Layout } from "@layouts/Layout";
import { Flex, Spinner } from "@ui";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const isAuthLoading = useAuthListening();

	const { navigateFromPlatform } = useAuthNavigating();
	const user = useAppSelector((state) => state.user.user.uid);

	if (isAuthLoading) {
		return (
			<Flex full center>
				<Spinner size={24} />
			</Flex>
		);
	}

	if (!user) {
		navigateFromPlatform();
		return null;
	}

	return <Layout>{children}</Layout>;
};
