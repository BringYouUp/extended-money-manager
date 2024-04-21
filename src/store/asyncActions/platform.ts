/* eslint-disable @typescript-eslint/ban-ts-comment */

import { getActualFormatDate, getRef, getStoreErrorFormat } from '@utils';
import { getDocs, setDoc } from 'firebase/firestore';
import { Currencies, StorePlatformPlatform } from '@models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { currency } from '@shared';

export const platformSetUpdatePlatformCurrency = createAsyncThunk<Currencies, null>(
  'platform/platformSetUpdatePlatformCurrency',
  (_, { rejectWithValue, fulfillWithValue, }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.platformCurrency()
      let dataToReturn: Currencies

      currency.get().then(({ data }) => {
        dataToReturn = { ...data, updatedAt: getActualFormatDate() }
        return setDoc(docRef, dataToReturn, { merge: true })
      })
        .then(() => resolve(fulfillWithValue(dataToReturn)))
        .catch((err) => {
          console.error('ERROR dispatching platformSetUpdatePlatformCurrency', err)
          reject(rejectWithValue(getStoreErrorFormat(err)))
        })
    })
  }
)

export const platformSetPlatform = createAsyncThunk<StorePlatformPlatform, null>(
  'platform/platformSetPlatform',
  (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    return new Promise((resolve, reject) => {
      const docRef = getRef.platform()

      getDocs(docRef)
        .then(docSnap => {
          const data: StorePlatformPlatform = {} as StorePlatformPlatform

          docSnap.forEach(async doc => {
            const docData = doc.data() as StorePlatformPlatform[keyof StorePlatformPlatform]

            if (doc.id === 'currency') {
              if (docData.updatedAt) {
                const getDay = (data: string) => data.split('T')[0].match(/\d*$/g)?.[0]
                const isNeedUpdateCurrency = getDay(docData.updatedAt) !== getDay(new Date().toISOString())

                if (isNeedUpdateCurrency) {
                  console.info(`→ UPDATE CURRENCY`);
                  try {
                    await dispatch(platformSetUpdatePlatformCurrency(null))
                  } catch (e) {
                    console.error('ERROR while gettings actual currency', e)
                  }
                } else {
                  console.info(`→ NO UPDATE CURRENCY`);
                  data[doc.id] = docData as Currencies
                }
              } else {
                console.info(`→ SET CURRENCY`);
                try {
                  await dispatch(platformSetUpdatePlatformCurrency(null))
                } catch (e) {
                  console.error('ERROR while gettings actual currency', e)
                }
              }
            } else {
              // @ts-expect-error
              data[doc.id] = docData
            }
          })
          resolve(fulfillWithValue(data as StorePlatformPlatform))
        })
        .catch(err => reject(rejectWithValue(getStoreErrorFormat(err))))
    })
  }
)