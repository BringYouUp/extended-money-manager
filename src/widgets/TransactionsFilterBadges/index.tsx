"use client";

import { TRANSACTIONS_TYPES } from "@consts/transactions";
import { useAppSelector } from "@hooks/useAppSelector";
import { ACCOUNT_SELECTOR, CATEGORY_SELECTOR } from "@selectors";
import { Badge } from "@ui";

export function TransactionsFilterBadges({
	data,
	onRemove,
}: {
	data: Hooks.UseFilterTransactions.FilterModel;
	onRemove: Hooks.UseFilterTransactions.UpdateFilter;
}) {
	const categories = useAppSelector(CATEGORY_SELECTOR.allCategoriesSelector);
	const accounts = useAppSelector(ACCOUNT_SELECTOR.allAccountsSelector);

	return (
		<>
			{data["transaction-types"].map((transactionType) => {
				const found = TRANSACTIONS_TYPES.find(
					(_transactionType) => _transactionType.type === transactionType,
				);

				if (!found) return;
				return (
					<Badge
						// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
						onClick={() => {}}
						key={found.type}
						active={true}
						badgeColor={found.color}
						icon="bank-card"
						text={found.label}
						type="transaction-type"
						onRemove={() => onRemove("transaction-types", found.type)}
					/>
				);
			})}
			{data.categories.map((categoryId) => {
				const found = categories.find((category) => category.id === categoryId);

				if (!found) return;
				return (
					<Badge
						// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
						onClick={() => {}}
						key={found.id}
						active={true}
						badgeColor={found.color}
						icon={found.icon}
						text={found.name}
						type="category"
						onRemove={() => onRemove("categories", categoryId)}
					/>
				);
			})}
			{data.accounts.map((accountId) => {
				const found = accounts.find((account) => account.id === accountId);

				if (!found) return;
				return (
					<Badge
						// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
						onClick={() => {}}
						key={found.id}
						active={true}
						badgeColor={found.color}
						icon="bank-card"
						text={found.name}
						type="account"
						onRemove={() => onRemove("accounts", accountId)}
					/>
				);
			})}
			{data.mode === "AND" ? (
				<Badge
					// biome-ignore lint/suspicious/noEmptyBlockStatements: <_>
					onClick={() => {}}
					key={data.mode}
					active={true}
					badgeColor={-1}
					icon="attributes"
					text={data.mode}
					type="account"
				/>
			) : null}
		</>
	);
}
