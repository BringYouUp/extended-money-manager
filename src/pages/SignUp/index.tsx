import { useAppSelector, useAuthListening, useAuthNavigating } from "@hooks";
import styles from "./index.module.css";
import { SignUpForm } from "@containers";
import { Container, Flex, Offset, Spinner, Text } from "@components";

export const Component: React.FC = () => {
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
    <Flex column full center>
      <Container full background="var(--soft-background-color)">
        <Flex full center>
          <Container width="300px">
            <Container
              fullW
              background="var(--background-color)"
              className={styles.container}
            >
              <Offset padding={[24, 16]}>
                <Flex fullW column gap={24}>
                  <Text uppercase as="h2" weight={400}>
                    Sign up
                  </Text>
                  <SignUpForm />
                </Flex>
              </Offset>
            </Container>
          </Container>
        </Flex>
      </Container>
    </Flex>
  );
};
