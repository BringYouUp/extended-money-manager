import { Flex, Spinner } from "@components";

export const SuspenseLoader = () => {
  return (
    <Flex full center>
      <Spinner color="var(--text-color-90)" size={36} />
    </Flex>
  );
};
