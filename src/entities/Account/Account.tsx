import { AccountDrawer } from "@features/Drawers";

import { useOpen } from "@hooks/useOpen";
import { MouseEvent, MouseEventHandler } from "react";
import Components from "./components";

type Props = {
	data: Store.Account | Omit<Store.Account, Store.OmittedDateFields>;
	style?: React.CSSProperties;
	noClick?: boolean;
	selected?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement> | ((e: unknown) => void);
};

export function Account({
	noClick,
	data,
	selected,
	onClick,
	style,
	...rest
}: Props) {
	const [isOpened, onOpen, onClose] = useOpen();

	const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
		if (noClick) return;

		if (onClick || typeof onClick === "function") {
			return onClick(e);
		} else {
			onOpen();
		}
	};

	return (
		<>
			<Account.Wrap
				selected={selected}
				deleted={data.deleted}
				style={style}
				onClick={onClickHandler}
				color={data.color}
				{...rest}
			>
				<Account.Info deleted={data.deleted} name={data.name} />
				<Account.Amount amount={data.amount} currency={data.currency} />
			</Account.Wrap>
			<AccountDrawer
				is={isOpened as boolean}
				onClose={onClose}
				data={data as Store.Account}
			/>
		</>
	);
}

Account.Info = Components.AccountInfo;
Account.Amount = Components.AccountAmount;
Account.Wrap = Components.AccountWrap;
Account.Empty = Components.AccountEmpty;
