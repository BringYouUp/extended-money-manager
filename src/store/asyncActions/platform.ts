import { createAsyncThunk } from "@reduxjs/toolkit";
import { currency } from "@shared/utils";
import {
  getActualFirestoreFormatDate,
  getRef,
  getStoreErrorFormat,
  toSerializeActualFirestoreFormatDate,
} from "@utils/store";
import { getDocs, setDoc } from "firebase/firestore";

export const platformSetUpdatePlatformCurrency = createAsyncThunk<
  Shared.Currencies.Currencies,
  null
>(
  "platform/platformSetUpdatePlatformCurrency",
  (_, { rejectWithValue, fulfillWithValue }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.platformCurrency();
      let dataToReturn: Shared.Currencies.Currencies;

      currency
        .get()
        .then(({ data }) => {
          dataToReturn = {
            ...data,
            updatedAt: getActualFirestoreFormatDate() as unknown as string,
          };
          return setDoc(docRef, dataToReturn, { merge: true });
        })
        .then(() => resolve(fulfillWithValue(dataToReturn)))
        .catch((err) => {
          console.error(
            "ERROR dispatching platformSetUpdatePlatformCurrency",
            err
          );
          reject(rejectWithValue(getStoreErrorFormat(err)));
        });
    });
  }
);

export const platformSetPlatform = createAsyncThunk<Store.Platform, null>(
  "platform/platformSetPlatform",
  (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.platform();

      getDocs(docRef)
        .then((docSnap) => {
          const data: Store.Platform = {} as Store.Platform;

          docSnap.forEach(async (doc) => {
            const docData = doc.data() as Store.Platform[keyof Store.Platform];

            if (doc.id === "currency") {
              if (docData.updatedAt) {
                const getDay = (data: string): string =>
                  data.split("T")[0].match(/\d*$/g)?.[0] || "";

                toSerializeActualFirestoreFormatDate<Shared.Currencies.Currencies>(
                  docData as Shared.Currencies.Currencies
                );
                const isNeedUpdateCurrency =
                  getDay(docData.updatedAt) !==
                  getDay(new Date().toISOString());

                if (isNeedUpdateCurrency) {
                  console.info(`→ UPDATE CURRENCY`);
                  try {
                    await dispatch(platformSetUpdatePlatformCurrency(null));
                  } catch (e) {
                    console.error("ERROR while gettings actual currency", e);
                  }
                } else {
                  // console.info(`→ NO UPDATE CURRENCY`);
                  data[doc.id] = docData as Shared.Currencies.Currencies;
                }
              } else {
                console.info(`→ SET CURRENCY`);
                try {
                  await dispatch(platformSetUpdatePlatformCurrency(null));
                } catch (e) {
                  console.error("ERROR while gettings actual currency", e);
                }
              }
            } else {
              // @ts-expect-error
              data[doc.id] = docData;
            }
          });
          resolve(fulfillWithValue(data as Store.Platform));
        })
        .catch((err) => reject(rejectWithValue(getStoreErrorFormat(err))));
    });
  }
);
