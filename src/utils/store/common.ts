import { FirebaseError } from "firebase/app";
import { Timestamp } from "firebase/firestore";

export const getActualFirestoreFormatDate = (date?: string): Timestamp => {
  return new Timestamp((date ? new Date(date) : new Date()).valueOf() / 1000, 0)
}

export const toSerializeActualFirestoreFormatDate = <T extends {
  updatedAt: Timestamp | string,
  createdAt?: Timestamp | string,
  date?: Timestamp | string,
}>(data: T) => {
  if (data.date instanceof Timestamp) {
    data.date = data.date.toDate().toISOString().split("T")[0]
  }

  if (data.updatedAt instanceof Timestamp) {
    data.updatedAt = data.updatedAt.toDate().toISOString()
  }

  if (data.createdAt instanceof Timestamp) {
    data.createdAt = data.createdAt.toDate().toISOString()
  }
}

export const getStoreErrorFormat = (err: FirebaseError): Store.Error => {
  return {
    code: err?.code,
    message: err.message.replace('Firebase: Error ', '').replace(/(\(|\)\.)/g, '')
  }
}