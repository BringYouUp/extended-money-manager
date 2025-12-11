// @ts-nocheck

import { Middleware, UnknownAction } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@store";
import { toSerializeActualFirestoreFormatDate } from "@utils/store";

export const serializeCreatedAtUpdatedAt: Middleware<
	unknown,
	RootState,
	AppDispatch
> = () => {
	return (next) => {
		return (action: UnknownAction) => {
			switch (action.type) {
				case "accounts/accountsSetAccounts/fulfilled":
					action.payload.forEach(
						toSerializeActualFirestoreFormatDate<Store.Account>,
					);
					break;
				case "categories/categoriesSetCategories/fulfilled":
					action.payload.forEach(
						toSerializeActualFirestoreFormatDate<Store.Category>,
					);
					break;
				case "transactions/transactionsSetTransactions/fulfilled":
					action.payload.forEach(
						toSerializeActualFirestoreFormatDate<Store.Transaction>,
					);
					break;
				case "accounts/accountsAddAccount/fulfilled":
				case "accounts/accountsEditAccount/fulfilled":
					toSerializeActualFirestoreFormatDate(action.payload);
					break;
				case "categories/categoriesAddCategory/fulfilled":
				case "categories/categoriesEditCategory/fulfilled":
					toSerializeActualFirestoreFormatDate<Store.Category>(action.payload);
					break;
				case "transactions/transactionsAddTransaction/fulfilled":
				case "transactions/transactionsEditTransaction/fulfilled":
					toSerializeActualFirestoreFormatDate<Store.Transaction>(
						action.payload,
					);
					break;
				case "platform/platformSetUpdatePlatformCurrency/fulfilled":
					toSerializeActualFirestoreFormatDate<Shared.Currencies.Currencies>(
						action.payload,
					);
					break;
				case "transactions/transactionsGetFilteredTransactions/fulfilled":
					action.payload.forEach(
						toSerializeActualFirestoreFormatDate<Store.Transaction>,
					);
					break;
			}
			return next(action);
		};
	};
};
