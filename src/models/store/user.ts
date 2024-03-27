export type StoreUserUser = {
  email: string;
  displayName: string;
  phoneNumber: string;
  uid: string;
  emailVerified: boolean;
  photoURL: string;
}

export type StoreUserError = {
  message: string,
  code: "" | "auth/invalid-credential" | "unknown" | "auth/missing-email" | "auth/too-many-requests" | "auth/account-exists-with-different-credential"
}

export type StoreUser = {
  user: StoreUserUser,
  error: StoreUserError,
}
