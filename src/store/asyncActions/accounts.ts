import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRef, getStoreErrorFormat } from "@utils/store";

import { addDoc, getDocs, setDoc } from "firebase/firestore";

export const accountsSetAccounts = createAsyncThunk<Store.Account[], string>(
	"accounts/accountsSetAccounts",
	(uid, { rejectWithValue, fulfillWithValue }) => {
		return new Promise((resolve, reject) => {
			const docRef = getRef.accounts(uid);

			getDocs(docRef)
				.then((docSnap) => {
					if (docSnap.size) {
						const data: Store.Account[] = [];
						docSnap.forEach((doc) => {
							data.push({
								...(doc.data() as Store.Account),
								id: doc.id,
							});
						});
						resolve(fulfillWithValue(data));
					} else {
						resolve(fulfillWithValue([]));
					}
				})
				.catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
		});
	},
);

export const accountsAddAccount = createAsyncThunk<
	Store.Account,
	{ account: Omit<Store.Account, Store.OmittedDateFields>; uid: string }
>(
	"accounts/accountsAddAccount",
	({ account, uid }, { fulfillWithValue, rejectWithValue }) => {
		return new Promise((resolve, reject) => {
			const docRef = getRef.accounts(uid);

			addDoc(docRef, account)
				.then((data) => {
					resolve(
						fulfillWithValue({
							...account,
							id: data.id,
						} as Store.Account),
					);
				})
				.catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
		});
	},
);

export const accountsEditAccount = createAsyncThunk<
	Partial<Store.Account> & Pick<Store.Account, "id">,
	{ account: Partial<Store.Account> & Pick<Store.Account, "id">; uid: string }
>(
	"accounts/accountsEditAccount",
	({ account, uid }, { rejectWithValue, fulfillWithValue }) => {
		return new Promise((resolve, reject) => {
			const docRef = getRef.accountsEdit(uid, account.id);
			setDoc(docRef, account, { merge: true })
				.then(() => resolve(fulfillWithValue(account)))
				.catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
		});
	},
);
