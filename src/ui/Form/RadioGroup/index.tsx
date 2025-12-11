import { Flex, Text } from "@ui";
import { cn } from "@utils/styles";
import { FormGroup } from "../index";
import styles from "./index.module.css";

export type PropsData = {
	label: string;
	value: string;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	id?: string;
	data: {
		label: string;
		value: string;
	}[];
	name: string;
	error?: boolean;
	hidden?: boolean;
	style?: React.CSSProperties;
	className?: string;
	children?: never;
	checked?: boolean;
}

export const RadioGroup: React.FC<Props> = ({
	data,
	style,
	name,
	hidden,
	error,
	className,
	...rest
}) => {
	return (
		<FormGroup
			style={{
				height: "34px",
				...style,
			}}
			error={error}
			className={cn(
				styles.group,
				{
					[styles.hidden]: hidden,
				},
				className,
			)}
			{...rest}
		>
			<Flex w100 h100 gap={4} alignCenter>
				{data.map((item) => {
					return (
						<Flex key={item.value} flex1 h100 center>
							<input
								type="radio"
								className={cn(styles.hidden)}
								name={name}
								id={item.value}
								defaultValue={item.value}
							/>
							<label className={styles.label} htmlFor={item.value}>
								<Flex w100 h100 center>
									<Text>{item.label}</Text>
								</Flex>
							</label>
						</Flex>
					);
				})}
			</Flex>
		</FormGroup>
	);
};
