import { Button } from "../Button";
import { Flex } from "../Flex";

interface Props<T> {
	selected: boolean;
	parseItem: (item: T) => React.ReactNode;
	data: T;
}

export function SelectOption<T>({
	selected,
	parseItem,
	data,
	...rest
}: Props<T>) {
	return (
		<Button centered={false} theme="option" active={selected} {...rest}>
			<Flex alignCenter h100>
				{parseItem(data)}
			</Flex>
		</Button>
	);
}
