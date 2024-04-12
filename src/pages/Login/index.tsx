import { useAppSelector, useAuthListening, useAuthNavigating } from "@hooks";
import styles from "./index.module.css";
import { Container, Flex, Offset, Spinner, Text } from "@components";
import { LoginForm } from "@containers";

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
  );
};
