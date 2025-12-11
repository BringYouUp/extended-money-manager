import { LoginForm } from "@features/Forms";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAuthListening } from "@hooks/useAuthListening";
import { useAuthNavigating } from "@hooks/useAuthNavigating";
import { Container, Flex, Offset, Scrollable, Spinner, Text } from "@ui";
import styles from "./index.module.css";

const LoginPage: React.FC = () => {
	const isAuthLoading = useAuthListening();

	const { navigateToPlatform } = useAuthNavigating();

	const user = useAppSelector((state) => state.user.user.uid);

	if (isAuthLoading) {
		return (
			<Flex full center>
				<Spinner size={36} />
			</Flex>
		);
	}

	if (user) {
		navigateToPlatform();
		return;
	}

	return (
		<Scrollable overlay full stableGutter>
			<Offset
				style={{ height: "100vh", minHeight: "480px", minWidth: "332px" }}
				padding={[16]}
			>
				<Flex full center>
					<Container background="var(--soft-background-color)">
						<Flex full center>
							<Container width="300px">
								<Container
									w100
									background="var(--background-color)"
									className={styles.container}
								>
									<Offset padding={[24, 16]}>
										<Flex w100 column gap={24}>
											<Text uppercase as="h2" weight={500}>
												Log in
											</Text>
											<LoginForm />
										</Flex>
									</Offset>
								</Container>
							</Container>
						</Flex>
					</Container>
				</Flex>
			</Offset>
		</Scrollable>
	);
};

export default LoginPage;
