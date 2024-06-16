import { Flex, Spinner } from "@components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const SuspenseLoader = (props: Props) => {
  return (
    <Flex full center {...props}>
      <Spinner color="var(--text-color-90)" size={36} />
    </Flex>
  );
};
