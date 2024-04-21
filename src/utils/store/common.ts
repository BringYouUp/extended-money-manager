import { FirebaseError } from "firebase/app";
import { StoreError } from "@models";

export const getActualFormatDate = () => new Date().toISOString()

export const getStoreErrorFormat = (err: FirebaseError): StoreError => {
  return {
    code: err.code,
    message: err.message.replace('Firebase: Error ', '').replace(/(\(|\)\.)/g, '')
  }
}