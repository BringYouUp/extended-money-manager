// @ts-nocheck
import { Action, Dispatch, Middleware, UnknownAction } from "@reduxjs/toolkit";
import { getActualFirestoreFormatDate } from "@utils/store";

const dic = {
	"accounts/accountsEditAccount/pending": "account",
	"categories/categoriesEditCategory/pending": "category",
	"transactions/transactionsEditTransaction/pending": "transaction",
	"accounts/accountsAddAccount/pending": "account",
	"categories/categoriesAddCategory/pending": "category",
	"transactions/transactionsAddTransaction/pending": "transaction",
};

export const timeStampMiddleware: Middleware<
	unknown,
	unknown,
	Dispatch<UnknownAction>
> = () => {
	return (next) => {
		return (action: Action) => {
			switch (action.type) {
				case "accounts/accountsEditAccount/pending":
				case "categories/categoriesEditCategory/pending":
					action.meta.arg[dic[action.type]].updatedAt =
						getActualFirestoreFormatDate();
					break;
				case "accounts/accountsAddAccount/pending":
				case "categories/categoriesAddCategory/pending":
				case "transactions/transactionsAddTransaction/pending":
					action.meta.arg[dic[action.type]].createdAt =
						getActualFirestoreFormatDate();
					action.meta.arg[dic[action.type]].updatedAt =
						getActualFirestoreFormatDate();
					break;
			}
			return next(action);
		};
	};
};
