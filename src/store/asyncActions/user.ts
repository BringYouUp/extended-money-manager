import { USER_SLICES } from '@slices';

import { getRef, getStoreUserFormat } from '@utils';
import { AppDispatch } from '@store';
import { getDoc, setDoc } from 'firebase/firestore';
import { GotDoc, StoreUserUser } from '@models';

import { User } from 'firebase/auth';

export const accountsSetUser = (uid: string, user: User) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    const docRef = getRef.user(uid)

    const createProfileSnap = () => {
      const profile = getStoreUserFormat(user)
      return Promise.all<[unknown, StoreUserUser]>([
        setDoc(getRef.user(uid), { profile }, { merge: true }),
        profile
      ])
    }

    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data() as GotDoc

          if (data.profile) {
            dispatch(USER_SLICES.setUser(data.profile))
            resolve(data.profile)
            return
          } else {
            return createProfileSnap()
          }
        } else {
          return createProfileSnap()
        }
      })
      .then(data => {
        if (data?.[1]) {
          dispatch(USER_SLICES.setUser(data?.[1]))
          resolve(data?.[1])
        }
      })
      .catch(reject)
  })
}