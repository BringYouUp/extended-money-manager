import { User } from "firebase/auth";

export const getStoreUserFormat = (user: User): Store.User => {
	return {
		uid: user.uid,
		email: user.email || "",
		phoneNumber: user.phoneNumber || "",
		displayName: user.displayName || "",
		emailVerified: user.emailVerified || false,
		photoURL: user.photoURL || "",
	};
};
