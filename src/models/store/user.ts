import { StoreError } from "@models";

export type StoreUserUser = {
  email: string;
  displayName: string;
  phoneNumber: string;
  uid: string;
  emailVerified: boolean;
  photoURL: string;
}

export type StoreUser = {
  user: StoreUserUser,
  error: StoreError,
}
