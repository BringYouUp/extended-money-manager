import Components from "./components";

type Props = {
	data: Store.Toast;
	style?: React.CSSProperties;
	className?: string;
	children?: never;
	onClose: () => void;
};

export function Toast({ style, className, data, onClose }: Props) {
	return (
		<Toast.Wrapper type={data.type} className={className} style={style}>
			<Toast.Left>
				<Toast.Icon type={data.type} />
			</Toast.Left>
			<Toast.Center>
				<Toast.Title>{data.title}</Toast.Title>
				{data.description && (
					<Toast.Description>{data.description}</Toast.Description>
				)}
			</Toast.Center>
			<Toast.Right>
				<Toast.Close onClose={onClose} />
			</Toast.Right>
		</Toast.Wrapper>
	);
}

Toast.Wrapper = Components.Wrapper;
Toast.Icon = Components.Icon;
Toast.Left = Components.Left;
Toast.Right = Components.Right;
Toast.Close = Components.Close;
Toast.Center = Components.Center;
Toast.Title = Components.Title;
Toast.Description = Components.Description;
