import { Flex, Spinner } from "@ui";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SuspenseLoader = (props: Props) => {
	return (
		<Flex full center {...props}>
			<Spinner color="var(--text-color-90)" size={36} />
		</Flex>
	);
};

export default SuspenseLoader;
