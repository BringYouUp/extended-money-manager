import { Account } from "@entities/Account";
import { Drawer } from "@entities/Drawer";
import { AccountForm } from "@features/Forms";
import { withClosingConfirmation } from "@hocs/withClosingConfirmation";
import { useDebounce } from "@hooks/useDebounce";
import { Flex, Offset, Scrollable, Text } from "@ui";
import { FC, SetStateAction, useRef, useState } from "react";
import { INITIAL_STATE } from "./consts";

const AccountDrawer: FC<
	Components.AccountDrawer.Props & Hocs.WithClosingConfirmation.Props
> = ({ is, mode, onClose, data }) => {
	const isFormChanged = useRef<boolean>(false);

	const [values, setValues] = useState<Components.Form.Account>(
		mode === "edit"
			? {
					"account-name": data.name,
					"account-amount": data.amount,
					"account-color": data.color,
					"account-currency": data.currency,
					"is-create-transaction-after-change-account": "no",
					"transaction-category-id": data.id,
				}
			: (INITIAL_STATE as Components.Form.Account),
	);

	const setDebouncedValues = useDebounce((values) => {
		isFormChanged.current = true;
		setValues(values as Components.Form.Account);
	}, 125);

	const onCleanUp = () => {
		isFormChanged.current = false;
		setDebouncedValues(
			INITIAL_STATE as SetStateAction<Components.Form.Account>,
		);
	};

	const onCloseDrawer = (forceClose: boolean = false) => {
		onClose(forceClose || !isFormChanged.current, onCleanUp);
	};

	return (
		<Drawer side="right" isOpened={is} onClose={() => onCloseDrawer()}>
			<Drawer.Container>
				<Drawer.Content>
					<Flex full column gap={24} justifyBetween>
						<Flex justifyBetween alignCenter>
							<Drawer.Title>
								{mode === "create" ? "Create Account" : "Edit account"}
							</Drawer.Title>
							<Drawer.Close onClose={onCloseDrawer} />
						</Flex>
						<Scrollable full overlay>
							<Flex column gap={16}>
								<AccountForm
									mode={mode}
									initialValues={mode === "edit" ? data : (undefined as never)}
									setValues={setDebouncedValues}
									onClose={(isForceClose) =>
										onCloseDrawer(isForceClose as boolean)
									}
								/>
								<Offset padding={[16, 0, 32]}>
									<Flex column gap={16}>
										<Text weight={500} as="h4" center>
											Preview:
										</Text>
										<hr />
										<Flex justifyCenter full>
											<Account
												noClick
												style={{ zIndex: 2 }}
												data={{
													amount: +values["account-amount"] || 0,
													color: values["account-color"] || "",
													name: values["account-name"] || "",
													type: "regular",
													currency:
														values["account-currency"] ||
														("" as Shared.Currencies.CurrencySymbols),
													deleted: false,
												}}
											/>
										</Flex>
									</Flex>
								</Offset>
							</Flex>
						</Scrollable>
					</Flex>
				</Drawer.Content>
			</Drawer.Container>
		</Drawer>
	);
};

export const EditAccountDrawer =
	withClosingConfirmation<Components.AccountDrawer.Props>({
		title: "Confirm",
		subtitle: "Do you really want to close drawer?",
	})(AccountDrawer);
